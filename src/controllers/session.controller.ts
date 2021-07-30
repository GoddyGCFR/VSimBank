import { Request, Response } from 'express'
import { DocumentDefinition } from 'mongoose'
import { get } from 'lodash'
import { createAccessToken, createRefreshToken, createSession, findSession, updateSession } from '../services/session.service'
import { validateUsernameAndPassword } from '../services/user.service'
import { UserDocument } from '../models/user.model'

// Login and persist current session
const createSessionHandler = async (req: Request, res: Response): Promise<Response> => {
  const { username, password }: DocumentDefinition<UserDocument> = req.body
  const user = await validateUsernameAndPassword({ username, password })

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid username, email or password',
    })
  }

  const session = await createSession({ user: get(user, '_id'), userAgent: req.get('user-agent') || '' })

  if (!session) {
    return res.status(401).json({
      success: false,
      message: 'An error occurred, please try again later',
    })
  }

  const accessToken = await createAccessToken({ user, session })

  const refreshToken = await createRefreshToken(session.toJSON())

  return res.status(201).json({
    success: true,
    message: 'Session created',
    session: { accessToken, refreshToken },
  })
}

// Retrieve active session details
export const getSessionHandler = async (req: Request, res: Response): Promise<Response> => {
  const session = await findSession({ _id: get(req, 'user.session') })

  return res.json({ success: true, message: 'Currently logged in session', session })
}

// Logout User
export const deleteSessionHandler = async (req: Request, res: Response): Promise<Response> => {
  const session = await updateSession(get(req, 'user.session'))

  return res.json({ success: true, message: 'Session deleted successfully', session })
}

export { createSessionHandler }
