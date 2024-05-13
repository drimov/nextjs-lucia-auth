import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getUser } from "@/lib/auth/auth-utils"
export default async function Home() {
  const user = await getUser()
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="space-y-4">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            className="size-32 p-4"
            width={100}
            height={100}
          />
          <h1 className="text-center text-3xl">Lucia Auth</h1>
        </div>
        <div className="space-x-4">
          <Link
            href="/sign-in"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Se connecter
          </Link>
          <Link
            href="/sign-up"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            S&apos;inscrire
          </Link>
          {user && (
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}
