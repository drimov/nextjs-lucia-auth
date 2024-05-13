import { CardContent } from "@/components/ui/card"
import CardWithTitleAndDescription from "@/components/card-with-title-description"
import FormOtpValidation from "@/components/features/auth/forms/form-otp-validation"

const Page = () => {
  return (
    <CardWithTitleAndDescription
      title="Validation OTP"
      description="Entrez le code OTP envoyé à votre adresse e-mail."
    >
      <CardContent>
        <FormOtpValidation />
      </CardContent>
    </CardWithTitleAndDescription>
  )
}

export default Page
