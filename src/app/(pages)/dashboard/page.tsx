import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { getUser } from "@/lib/auth/auth-utils"
import { getUserByIdDao } from "@/dao/schema/users/queries"
import { logoutAction } from "@/lib/actions/auth-actions"
import { redirect } from "next/navigation"

const Page = async () => {
  const session = await getUser()

  if (!session) {
    redirect("/sign-in")
  }
  const user = await getUserByIdDao(session.id)
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="space-y-4">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            className="size-32 p-4"
            width={100}
            height={100}
          />
        </Link>
        <h1 className="text-3xl">Dashboard</h1>
        <pre className="rounded-md bg-slate-700 p-8 text-slate-300">
          {JSON.stringify(user, undefined, 2)}
        </pre>
        <form action={logoutAction}>
          <Button type="submit">Logout</Button>
        </form>
      </div>
    </div>
  )
}

export default Page
