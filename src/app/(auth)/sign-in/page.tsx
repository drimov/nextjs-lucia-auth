import { CardContent, CardFooter } from "@/components/ui/card"

import CardWithTitleAndDescription from "@/components/card-with-title-description"
import Link from "next/link"
import SignInForm from "@/components/features/auth/forms/form-sign-in"

const Page = () => {
  return (
    <CardWithTitleAndDescription
      title="Se connecter"
      description="Entrer votre adresse e-mail pour vous connecter."
    >
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter>
        <div className="text-center text-sm">
          Pas de compte?{" "}
          <Link href="/sign-up" className="underline">
            Créer un compte
          </Link>
        </div>
      </CardFooter>
    </CardWithTitleAndDescription>
  )
}

export default Page
