import { sessionTable, userTable } from "~drizzle/schema/auth"

import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"
import { Lucia } from "lucia"
import db from "~drizzle/index"

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
})

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
  }
}
