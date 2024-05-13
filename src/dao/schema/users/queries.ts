import db from "~drizzle/index"
import { eq } from "drizzle-orm"
import { userTable } from "~drizzle/schema/auth"

export const getUserByEmailDao = async (email: string) => {
  const row = await db.query.userTable.findFirst({
    where: eq(userTable.email, email),
  })
  return row
}
export const getUserByIdDao = async (id: string) => {
  const row = await db.query.userTable.findFirst({
    where: eq(userTable.id, id),
  })
  return row
}

export const getUserByOtpCodeDao = async (code: string) => {
  const row = await db.query.otpTable.findFirst({
    where: (otp, { eq }) => eq(otp.code, code),
    with: {
      userTable: true,
    },
  })
  return row
}
