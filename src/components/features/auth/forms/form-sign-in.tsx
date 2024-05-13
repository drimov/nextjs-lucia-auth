"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitServerButton as SubmitButton } from "@/components/submit-button"
import { signInAction } from "@/lib/actions/auth-actions"
import { useFormState } from "react-dom"

const SignInForm = () => {
  const [state, formAction] = useFormState(signInAction, undefined)

  return (
    <form action={formAction}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="johndoe@example.com"
            autoComplete="email"
          />
          <div aria-live="polite" id={`email-error`} aria-atomic="true">
            {state && (
              <p className="text-sm font-medium text-destructive">{state}</p>
            )}
          </div>
        </div>
        <SubmitButton>Se connecter</SubmitButton>
      </div>
    </form>
  )
}

export default SignInForm
