import Image from "next/image"
import Link from "next/link"
import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Logo"
          className="size-32 p-4"
          width={100}
          height={100}
        />
      </Link>
      {children}
    </div>
  )
}

export default Layout
