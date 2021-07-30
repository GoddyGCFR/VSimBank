import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { decodeToken } from '../utils'
import { reIssueAccessToken } from '../services/session.service'

const decodeUser = async (req: Request, res: Response, next: NextFunction): Promise<NextFunction | Response | void> => {
  const requestAccessToken: string | undefined = req.headers['x-access-token'] as string | undefined

  if (!requestAccessToken) return next()

  const { decoded, expired }: JwtPayload = decodeToken(requestAccessToken)

  if (decoded) {
    // @ts-ignore
    <Record<string, unknown>>(req.user = decoded)
    return next()
  }

  const requestRefreshToken: string | undefined = req.headers['x-refresh-token'] as string | undefined

  if (expired && requestRefreshToken) {
    const newAccessToken: false | string = await reIssueAccessToken(requestRefreshToken)

    if (newAccessToken) {
      const token: string = newAccessToken as unknown as string

      res.setHeader('x-access-token', token)

      // eslint-disable-next-line no-shadow
      const { decoded }: JwtPayload = decodeToken(token)

      // @ts-ignore
      req.user = decoded
      return next()
    }

    return next()
  }

  return next()
}

export default decodeUser
