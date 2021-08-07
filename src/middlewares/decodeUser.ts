import { Request, Response, NextFunction } from 'express'
import { get, set } from 'lodash'
import { decodeToken } from '../utils'
import { reIssueAccessToken } from '../services/session.service'

const decodeUser = async (req: Request, res: Response, next: NextFunction): Promise<NextFunction | Response | void> => {
  const requestAccessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '') as string

  if (!requestAccessToken) return next()

  const { decoded, expired } = decodeToken(requestAccessToken)

  if (decoded) {
    set(req, 'user', decoded)
    return next()
  }

  const requestRefreshToken = get(req, "headers['x-refresh-token']") as string

  if (expired && requestRefreshToken) {
    const newAccessToken = await reIssueAccessToken(requestRefreshToken)

    if (newAccessToken) {
      const token = newAccessToken as string

      set(res, 'headers.authorization', token)

      // eslint-disable-next-line no-shadow
      const { decoded } = decodeToken(token)

      set(req, 'user', decoded)
      return next()
    }

    return next()
  }

  return next()
}

export default decodeUser
