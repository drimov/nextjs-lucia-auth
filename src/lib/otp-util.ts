import { env } from "@/env/server"
import { generateId } from "lucia"
import { createHmac } from "node:crypto"
import { Otp } from "~drizzle/schema/auth"

/**
 * Generates a Time-based One-Time Password (TOTP) using the given secret.
 *
 * @param {Buffer} secret - The secret key used for generating the TOTP.
 * @return {string} The generated TOTP as a string of 6 digits.
 * @see https://thecopenhagenbook.com/mfa
 */
function generateTOTP(secret: Buffer, digits = 6): string {
  const counter = Math.floor(Date.now() / 1000 / 30)

  // HOTP
  const mac = createHmac("sha1", secret)
  const buf = Buffer.alloc(8)
  buf.writeUInt32BE(counter, 0)
  mac.update(buf)
  const HS = mac.digest()
  const offset = HS[19] & 0x0f
  const Snum = HS.readUInt32BE(offset) & 0x7f_ff_ff_ff
  const D = Snum % Math.pow(10, digits)
  // Pad "0" to make it 6 digits.
  return D.toString().padStart(digits, "0")
}

export function generateOtp(userId: string) {
  const secret = Buffer.from(env.OTP_SECRET_KEY, "utf8")
  const code = generateTOTP(secret)
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000)
  const id = generateId(15)

  return { code, expiresAt, id, userId } satisfies Otp
}
