import { CardContent, CardFooter } from "@/components/ui/card"

import CardWithTitleAndDescription from "@/components/card-with-title-description"
import Link from "next/link"
import SignUpForm from "@/components/features/auth/forms/form-sign-up"

const Page = () => {
  return (
    <CardWithTitleAndDescription
      title="S'inscrire"
      description="Entrez les informations requises pour vous inscrire."
    >
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter>
        <div className="mt-4 text-center text-sm">
          Déjà un compte?{" "}
          <Link href="/sign-in" className="underline">
            Se connecter
          </Link>
        </div>
      </CardFooter>
    </CardWithTitleAndDescription>
  )
}

export default Page
