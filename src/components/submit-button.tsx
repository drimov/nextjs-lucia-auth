"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import React from "react"
import { cn } from "@/lib/utils"
import { useFormStatus } from "react-dom"

export const SubmitServerButton = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" aria-disabled={pending}>
      <Loader2
        className={cn("mr-2 h-4 w-4 animate-spin", !pending && "hidden")}
      />
      {children}
    </Button>
  )
}

export const SubmitClientButton = ({
  children,
  pending,
  ...props
}: {
  pending: boolean
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      <Loader2
        className={cn("mr-2 h-4 w-4 animate-spin", !pending && "hidden")}
      />
      {children}
    </Button>
  )
}
