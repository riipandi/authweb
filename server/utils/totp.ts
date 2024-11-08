import * as OTPAuth from 'otpauth'

export function generateTOTPSecret(): string {
  const secret = new OTPAuth.Secret({ size: 20 }) // 160 bits
  return secret.base32
}

export function generateTOTPUri(options: {
  secret: string
  accountName: string
  issuer: string
}): string {
  const totp = new OTPAuth.TOTP({
    issuer: options.issuer,
    label: options.accountName,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: options.secret,
  })

  return totp.toString()
}

export function verifyTOTP(secret: string, token: string): boolean {
  const totp = new OTPAuth.TOTP({
    issuer: 'Fastrue',
    label: 'auth',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: secret,
  })

  const delta = totp.validate({ token, window: 1 })
  return delta !== null
}
