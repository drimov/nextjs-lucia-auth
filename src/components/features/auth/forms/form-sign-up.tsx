"use client"

import {
  CreateUserWithoutId,
  createUserWithoutIdSchema,
} from "~drizzle/schema/auth"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { SubmitClientButton as SubmitButton } from "@/components/submit-button"
import { signUpAction } from "@/lib/actions/auth-actions"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"

const SignUpForm = () => {
  const router = useRouter()
  const form = useForm<CreateUserWithoutId>({
    resolver: zodResolver(createUserWithoutIdSchema),
    defaultValues: {
      email: "jeanrene@gmail.com",
      firstname: "jean",
      lastname: "rené",
    },
  })

  const onSubmit = async (data: CreateUserWithoutId) => {
    const result = await signUpAction(data)
    if (result?.error) {
      toast.error(result.error)
    }
    if (result?.success) {
      toast.success(result.success)
      router.push("/otp-validation")
    }
  }
  return (
    <div className="w-fit">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="first-name">Nom</FormLabel>
                  <FormControl>
                    <Input id="first-name" placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="last-name">Prénom</FormLabel>
                  <FormControl>
                    <Input id="last-name" placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton pending={form.formState.isSubmitting}>
            Créer un compte
          </SubmitButton>
        </form>
      </Form>
    </div>
  )
}

export default SignUpForm
