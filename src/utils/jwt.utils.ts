import dotenv from 'dotenv'
import { sign, verify, SignOptions, Secret, JwtPayload } from 'jsonwebtoken'

dotenv.config()
const secret: Secret = process.env.JWT as Secret

const signToken = (object: Record<string, unknown>, options: SignOptions | undefined): string => sign(object, secret, options)

const decodeToken = (token: string): JwtPayload => {
  try {
    const decoded = verify(token, secret)

    return <JwtPayload>{ isValid: true, expired: false, decoded }
  } catch (e) {
    return <JwtPayload>{ isValid: false, expired: true, decoded: null }
  }
}

export { signToken, decodeToken }
