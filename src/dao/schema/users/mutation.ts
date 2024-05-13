import {
  CreateOtp,
  CreateUser,
  DeleteOtp,
  otpTable,
  userTable,
} from "~drizzle/schema/auth"

import db from "~drizzle/index"
import { eq } from "drizzle-orm"

export const createUserDao = async (user: CreateUser) => {
  const row = await db.insert(userTable).values(user).returning()
  return row[0]
}

export const createOtpDao = async (otp: CreateOtp) => {
  await db.insert(otpTable).values(otp)
}

export const deleteOtpDao = async ({ userId }: DeleteOtp) => {
  await db.delete(otpTable).where(eq(otpTable.userId, userId))
}
