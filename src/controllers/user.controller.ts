import { Request, Response } from 'express'
import { createUser } from '../services/user.service'

export const createUserHandler = async (req: Request, res: Response): Promise<Response> => {
  const { body } = req
  const user = await createUser(body)

  const { username, email } = user

  return res.status(201).json({
    success: true,
    message: 'User created',
    data: { username, email },
  })
}
