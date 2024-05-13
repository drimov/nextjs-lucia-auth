import { resend } from "./resend"

type ResendSendType = typeof resend.emails.send
type ResendParamsType = Parameters<ResendSendType>

type ResendParamsTypeWithConditionalFrom = [
  payload: Omit<ResendParamsType[0], "from"> & { from?: string },
  options?: ResendParamsType[1],
]
export const sendEmail = async (
  ...params: ResendParamsTypeWithConditionalFrom
) => {
  if (process.env.NODE_ENV === "development") {
    params[0].subject = `[DEV] ${params[0].subject}`
  }

  const resendParams = [
    {
      ...params[0],
      // from: params[0].from ?? process.env.EMAIL_FROM,
      from: "onboarding@resend.dev",
      to: "delivered@resend.dev",
    } as ResendParamsType[0],
    params[1],
  ] satisfies ResendParamsType

  const result = await resend.emails.send(...resendParams)

  if (result.error) {
    throw new Error(
      `Erreur lors de l'envoi de l'email: ${result.error.message}`
    )
  }
}
