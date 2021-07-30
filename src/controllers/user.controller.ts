import { Request, Response } from 'express'
import { createUser } from '../services/user.service'

export const createUserHandler = async ({ body }: Request, res: Response): Promise<string | unknown> => {
  const user = await createUser(body)

  const { username, email } = user

  return res.status(201).json({
    success: true,
    message: 'User created',
    data: { username, email },
  })
}
