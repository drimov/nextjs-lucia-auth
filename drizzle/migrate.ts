#!/usr/bin/env node

import * as dotenv from "dotenv"

import { drizzle } from "drizzle-orm/node-postgres"
import { migrate } from "drizzle-orm/node-postgres/migrator"
import pg from "pg"

dotenv.config()

const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined")
  }
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
  })

  await client.connect()
  const db = drizzle(client)

  console.log("⏳ Running migrations...")

  const start = Date.now()
  // Exécution de la commande pour ajouter l'extension uuid-ossp
  // await db.execute(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
  await migrate(db, { migrationsFolder: "drizzle/migrations" })

  const end = Date.now()

  console.log("✅ Migrations completed in", end - start, "ms")

  process.exit(0)
}

try {
  await runMigrate()
} catch (error) {
  console.error("❌ Migration failed")
  console.error(error)
  process.exit(1)
}
