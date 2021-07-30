import { Request, Response } from 'express'
import { get } from 'lodash'
import { createProfile } from '../services/profile.service'

// @ts-ignore
export const createProfileHandler = async ({ body, user }: Request, res: Response): Response => {
  await createProfile({ user: get(user, '_id'), ...body })

  return res.status(201).json({
    success: true,
    message: 'Profile created',
  })
}
