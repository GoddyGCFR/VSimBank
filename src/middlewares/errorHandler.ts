import { Request, Response, NextFunction } from 'express'
import { log } from '../utils'

class HttpException extends Error {
  status: number

  message: string

  code: number

  name: string

  stack: string

  constructor(status: number, message: string, code: number, stack: string, name: string) {
    // super(message)
    super()
    this.status = status
    this.message = message
    this.code = code
    this.name = name
    this.stack = stack
  }
}
// @ts-ignore
const errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction): any => {
  if (err.name === 'MongoError' && err.code === 11000) {
    res.status(409).json({
      success: false,
      message: 'An account with that credentials already exist.',
      error: err?.stack,
    })
  }

  if (err.message.includes('ValidationError')) {
    return res.status(400).json({
      success: false,
      message: err.message.split(':')[1].toString().trim(),
      error: err?.stack,
    })
  }

  if (err.message.includes('Profile validation failed')) {
    return res.status(400).json({
      success: false,
      message: 'Error: Fields marked with "*" are required!!!',
      error: err?.stack,
    })
  }

  log.error(err)

  if (res.headersSent) return next(false)

  return res.status(err.status || 500).json({ success: false, message: 'Server Error', error: err?.stack })
}

export default errorHandler
