import { DocumentDefinition, FilterQuery } from 'mongoose'
import { omit } from 'lodash'
import User, { UserDocument } from '../models/user.model'

export const createUser = async (input: DocumentDefinition<UserDocument>): Promise<UserDocument> => User.create(input)

export const findUser = async (input: FilterQuery<UserDocument>): Promise<UserDocument | null> => User.findOne(input).lean()

export const validateUsernameAndPassword = async ({
  username,
  password,
}: {
  username: UserDocument['username']
  password: UserDocument['password']
}): Promise<false | UserDocument> => {
  const user =
    (await User.findOne({ username }).select('+password')) || (await User.findOne({ email: username }).select('+password'))

  if (!user) return false

  const isValid = await user.comparePassword(password)

  if (!isValid) return false

  return omit(user.toJSON(), 'password') as UserDocument
}
