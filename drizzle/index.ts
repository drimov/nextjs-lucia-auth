import * as auth from "~drizzle/schema/auth"

import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"
import { env } from "@/env/server"

const pool = new Pool({
  connectionString: env.DATABASE_URL,
})

const db = drizzle(pool, { schema: { ...auth } })

export default db
