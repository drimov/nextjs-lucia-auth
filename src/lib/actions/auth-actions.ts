"use server"

import {
  CreateUserWithoutId,
  createUserWithoutIdSchema,
  userEmailSchema,
} from "~drizzle/schema/auth"
import {
  createOtpDao,
  createUserDao,
  deleteOtpDao,
} from "@/dao/schema/users/mutation"
import {
  getUserByEmailDao,
  getUserByOtpCodeDao,
} from "@/dao/schema/users/queries"

import MagicLinkMail from "@/components/email/magic-link"
import { ZodError } from "zod"
import { cookies } from "next/headers"
import { generateId } from "lucia"
import { generateOtp } from "../otp-util"
import { getUser } from "../auth/auth-utils"
import { lucia } from "../auth/auth"
import { redirect } from "next/navigation"
import { sendEmail } from "../email/send-email"

export const signInAction = async (
  prevState: string | undefined,
  formData: FormData
) => {
  const validateField = userEmailSchema.safeParse({
    email: formData.get("email"),
  })

  if (!validateField.success) {
    return validateField.error.flatten().fieldErrors?.email?.[0]
  }

  const emailLowerCase = validateField.data.email.toLowerCase()
  const request = await getUserByEmailDao(emailLowerCase)

  if (!request) {
    return "Aucun compte n'est associé à cet e-mail." as const
  }
  const otp = generateOtp(request.id)
  try {
    await createOtpDao(otp)
  } catch (error) {
    console.error(error)
    return `Une erreur interne est survenue.` as const
  }

  const result = await sendEmail({
    to: request.email,
    subject: "Connexion",
    react: MagicLinkMail({ code: otp.code }),
  })
  if (result.error) {
    return `Erreur lors de l'envoi de l'email: ${result.error.message}` as const
  }
  redirect("/otp-validation")
}

export const signUpAction = async (data: CreateUserWithoutId) => {
  try {
    createUserWithoutIdSchema.parse(data)
    const existedUser = await getUserByEmailDao(data.email.toLowerCase())
    if (existedUser) {
      return {
        error: "Un compte existe déjà avec cette adresse email.",
      }
    }
    const userId = generateId(15)
    await createUserDao({ ...data, id: userId })
    const otp = generateOtp(userId)
    await createOtpDao(otp)

    const result = await sendEmail({
      to: data.email,
      subject: "Connexion",
      react: MagicLinkMail({ code: otp.code }),
    })
    if (result.error) {
      return {
        error:
          `Erreur lors de l'envoi de l'email: ${result.error.message}` as const,
      }
    }
    return {
      success: "Un email de connexion vous a été envoyé.",
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("classic error")
      return {
        error: error.message,
      }
    }
    if (error instanceof ZodError) {
      console.log("ZodError")

      return {
        error: error.issues[0].message,
      }
    }
    return {
      error: "Une erreur est survenue.",
    }
  }
}

export const logoutAction = async () => {
  const session = await getUser()
  if (!session) {
    return {
      error: "Unauthorized",
    }
  }
  await lucia.invalidateSession(session.id)
  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return redirect("/sign-in")
}

export const otpValidationAction = async (code: string) => {
  const request = await getUserByOtpCodeDao(code)

  if (!request) {
    return {
      error: "Code invalide" as const,
    }
  }
  await deleteOtpDao({ userId: request.userId })

  const session = await lucia.createSession(request.userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
}
