import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp"

type OTPAutoProps = {
  maxLength?: number
  onComplete?: (code: string) => void
  onChange?: (value: string) => void
}
const OTPAuto = ({ maxLength, onComplete, onChange }: OTPAutoProps) => {
  const length = maxLength ?? 6
  const firstHalf = Math.round(length / 2)
  const secondHalf = length - firstHalf
  return (
    <InputOTP maxLength={length} onComplete={onComplete} onChange={onChange}>
      <InputOTPGroup>
        {Array.from({ length: firstHalf }).map((_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
        <InputOTPSeparator />
        {Array.from({ length: secondHalf }).map((_, index) => (
          <InputOTPSlot key={firstHalf + index} index={firstHalf + index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}

export default OTPAuto
