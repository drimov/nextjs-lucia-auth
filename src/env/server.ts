import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    RESEND_API_KEY: z.string().min(1),
    OTP_SECRET_KEY: z.string().min(1),
  },
  runtimeEnv: process.env,
})
