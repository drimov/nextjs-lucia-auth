import { defineConfig } from "drizzle-kit"
import { env } from "@/env/server"

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schema",
  out: "./drizzle/migrations",
  dbCredentials: {
    url: env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
  introspect: {
    casing: "camel",
  },
})
