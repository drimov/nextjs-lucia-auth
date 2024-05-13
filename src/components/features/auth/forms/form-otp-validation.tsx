"use client"

import { FormEvent, useState, useTransition } from "react"

import OTPAuto from "@/components/otp-auto"
import { SubmitClientButton as SubmitButton } from "@/components/submit-button"
import { otpValidationAction } from "@/lib/actions/auth-actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const FormOtpValidation = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [code, setCode] = useState<string>("")

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await submittedCode(code)
  }
  const submittedCode = async (code: string) => {
    startTransition(async () => {
      const result = await otpValidationAction(code)
      if (result?.error) {
        toast.error(result.error)
        return
      } else {
        router.push("/dashboard")
      }
    })
  }

  return (
    <form
      className="flex w-full flex-col items-center gap-4"
      onSubmit={onSubmit}
    >
      <OTPAuto maxLength={6} onChange={setCode} onComplete={submittedCode} />
      <SubmitButton
        pending={isPending}
        className="w-full"
        disabled={!code || code.length < 6}
      >
        Valider
      </SubmitButton>
    </form>
  )
}

export default FormOtpValidation
