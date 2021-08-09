import { DocumentDefinition, FilterQuery, LeanDocument, Query, UpdateWriteOpResult, UpdateQuery } from 'mongoose'
import { get } from 'lodash'
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
}): Promise<LeanDocument<SessionDocument>> => {
  const session = await Session.create({ user, userAgent })

  return session.toJSON()
}

export const findSession = async (input: FilterQuery<SessionDocument>): Promise<SessionDocument | null> =>
  Session.findOne(input).lean()

export const updateSession = async (
  filter: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
): Promise<Query<UpdateWriteOpResult, SessionDocument>> => Session.updateOne(filter, update)

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

  const decodedSessionId = get(decoded, '_id') as SessionDocument['_id']

  if (!decoded || !decodedSessionId) return false

  const session = await findSession({ _id: decodedSessionId })

  if (!session || !session?.isValid) return false

  const user = await findUser({ _id: get(session, 'user') })

  if (!user) return false

  return createAccessToken({ user, session: get(session, '_id') })
}
