import { Request, Response, NextFunction } from 'express'
import { get } from 'lodash'

const authUser = (req: Request, res: Response, next: NextFunction): Response | NextFunction | void => {
  const user = get(req, 'user')
  if (!user)
    return res.status(401).json({
      success: false,
      message: 'Authentication required.',
    })

  return next()
}

export default authUser
