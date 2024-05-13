"use server"

import { cache } from "react"
import { cookies } from "next/headers"
import { lucia } from "./auth"

export const getUser = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? undefined
  if (!sessionId) return
  const { user, session } = await lucia.validateSession(sessionId)
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }
  return user ?? undefined
})
