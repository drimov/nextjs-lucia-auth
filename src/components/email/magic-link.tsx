import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

import { Fragment } from "react"

// MagicLinkMail.PreviewProps = {
//   url: "test",
// } as MagicLinkMailProps

type MagicLinkMailProps = {
  code: string
}
export default function MagicLinkMail({ code }: MagicLinkMailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Fragment>
          <Preview>
            Vous avez demander un lien magique pour connecter votre compte.
          </Preview>
          <Body className="mx-auto my-auto bg-white px-2 font-sans">
            <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-8">
              <Text className="text-2xl font-bold text-black">Connexion</Text>
              <Section className="my-4">
                <Text className="inline-block text-center text-3xl font-bold leading-10 tracking-wide">
                  {code}
                </Text>
                <Text className="text-base text-gray-500">
                  Si vous avez pas demandé ce lien, veuillez ignorer cet email.
                </Text>
              </Section>
              <Text className="text-base leading-6 text-gray-500">
                SaaS Tracker - Entrepreneur
              </Text>
            </Container>
          </Body>
        </Fragment>
      </Tailwind>
    </Html>
  )
}
