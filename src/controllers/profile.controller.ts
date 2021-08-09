import { Request, Response } from 'express'
import { get } from 'lodash'
import { createProfile, findProfile, updateProfile } from '../services/profile.service'
import { ProfileDocument } from '../models/profile.model'

export const createProfileHandler = async (req: Request, res: Response): Promise<Response> => {
  const { body } = req
  const user = get(req, 'user._id')

  const profile = await findProfile(user)

  if (profile) return res.status(409).json({ success: false, message: 'Profile already exists' })

  await createProfile({ user, ...body })

  return res.status(201).json({
    success: true,
    message: 'Profile created',
  })
}

export const updateProfileHandler = async (req: Request, res: Response): Promise<Response> => {
  const { body } = req
  const user = get(req, 'user._id') as ProfileDocument['user']
  await updateProfile({ user }, { ...body })

  // TODO: Profile updates requires government approved documents
  // TODO: Profile updates can only be done once every 6 months

  return res.json({
    success: true,
    message: 'Profile updated',
  })
}
