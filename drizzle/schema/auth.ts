import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"

import { relations } from "drizzle-orm"
import { z } from "zod"

// TABLES
export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  email: text("email").notNull().unique(),
})

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
})

export const otpTable = pgTable("otp", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  code: text("code").notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
})

// USERS
export const insertUserSchema = createInsertSchema(userTable)
export const selectUserSchema = createSelectSchema(userTable)

export const userEmailSchema = insertUserSchema
  .pick({
    email: true,
  })
  .extend({
    email: z.string().email({
      message: "L'email n'est pas valide.",
    }),
  })
export const createUserSchema = insertUserSchema
  .pick({
    id: true,
    email: true,
    firstname: true,
    lastname: true,
  })
  .extend({
    email: z.string().email({
      message: "L'email n'est pas valide.",
    }),
    firstname: z
      .string()
      .min(2, {
        message: "Le nom doit contenir au moins 3 caractères.",
      })
      .max(30, {
        message: "Le nom ne doit pas contenir plus de 30 caractères.",
      }),
    lastname: z
      .string()
      .min(2, {
        message: "Le nom doit contenir au moins 3 caractères.",
      })
      .max(30, {
        message: "Le nom ne doit pas contenir plus de 30 caractères.",
      }),
  })

export const createUserWithoutIdSchema = createUserSchema.omit({ id: true })
export type User = z.infer<typeof selectUserSchema>
export type UserEmail = z.infer<typeof userEmailSchema>
export type CreateUser = z.infer<typeof insertUserSchema>
export type CreateUserWithoutId = z.infer<typeof createUserWithoutIdSchema>

// OTP
export const insertOtpSchema = createInsertSchema(otpTable)
export const selectOtpSchema = createSelectSchema(otpTable)
export const createOtpSchema = insertOtpSchema
export const deleteOtpSchema = insertOtpSchema.pick({ userId: true })

export type Otp = z.infer<typeof selectOtpSchema>
export type CreateOtp = z.infer<typeof createOtpSchema>
export type DeleteOtp = z.infer<typeof deleteOtpSchema>

export const userRelations = relations(userTable, ({ one }) => ({
  otpTable: one(otpTable, {
    fields: [userTable.id],
    references: [otpTable.userId],
  }),
}))

export const otpRelations = relations(otpTable, ({ one }) => ({
  userTable: one(userTable, {
    fields: [otpTable.userId],
    references: [userTable.id],
  }),
}))
