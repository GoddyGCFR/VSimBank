import { Request, Response } from 'express'
import { get } from 'lodash'
import { createAccount, findAccount } from '../services/account.service'
import { AccountDocument } from '../models/account.model'
import { findProfile } from '../services/profile.service'
import { ProfileDocument } from '../models/profile.model'

export const createAccountHandler = async (req: Request, res: Response): Promise<Response> => {
  const { body } = req
  const accountType: AccountDocument['accountType'] = get(body, 'accountType')
  const user: AccountDocument['user'] | ProfileDocument['user'] = get(req, 'user._id')

  const profileExists = await findProfile({ user })
  if (!profileExists)
    return res.status(403).json({ success: false, message: `Please create your profile to enjoy access to this feature` })

  const accountExists = await findAccount({ user, accountType })
  if (accountExists) return res.status(409).json({ success: false, message: `You can only hold one typ of this account` })

  await createAccount({ accountType, user })

  return res.status(201).json({
    success: true,
    // eslint-disable-next-line max-len
    message: `Your account ${accountType?.toLocaleUpperCase} has been created, you can now  receive funds with your phone number into this account`,
  })
}
