import { DocumentDefinition, FilterQuery, LeanDocument, Query, UpdateWriteOpResult } from 'mongoose'
import { Session, SessionDocument } from '../models/session.model'
import { UserDocument } from '../models/user.model'
import { signToken, decodeToken } from '../utils'
import { findUser } from './user.service'

export const createSession = async ({
  user,
  userAgent,
}: {
  user: DocumentDefinition<SessionDocument['user']>
  userAgent: DocumentDefinition<SessionDocument['userAgent']>
}): Promise<SessionDocument> => Session.create({ user, userAgent })

export const findSession = async (input: FilterQuery<SessionDocument>): Promise<SessionDocument | null> =>
  Session.findOne(input).lean()

export const updateSession = async (session: SessionDocument['_id']): Promise<Query<UpdateWriteOpResult, SessionDocument>> =>
  Session.updateOne({ _id: session }, { isValid: false })

export const createAccessToken = async ({
  user,
  session: { _id },
}: {
  user: DocumentDefinition<UserDocument> | LeanDocument<DocumentDefinition<UserDocument>>
  session: DocumentDefinition<SessionDocument['_id']> | LeanDocument<DocumentDefinition<SessionDocument['_id']>>
}): Promise<string> => signToken({ ...user, session: _id }, { expiresIn: process.env.ACCESS_TTL })

export const createRefreshToken = async (
  session: DocumentDefinition<SessionDocument> | LeanDocument<DocumentDefinition<SessionDocument>>
): Promise<string> => signToken({ ...session }, { expiresIn: process.env.REFRESH_TTL })

export const reIssueAccessToken = async (refreshToken: string): Promise<false | string> => {
  const { decoded } = decodeToken(refreshToken)

  // eslint-disable-next-line no-underscore-dangle
  if (!decoded || !decoded._id) return false

  const { _id }: FilterQuery<SessionDocument['_id']> = decoded

  const session: SessionDocument | null = await findSession({ _id })

  if (!session || !session?.isValid) return false

  const user: UserDocument | null = await findUser({ _id: session.user })

  if (!user) return false

  // eslint-disable-next-line no-underscore-dangle
  return createAccessToken({ user, session: session._id })
}
