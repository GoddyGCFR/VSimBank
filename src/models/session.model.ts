import { Schema, model, Document } from 'mongoose'
import { UserDocument } from './user.model'

export interface SessionDocument extends Document {
  user: UserDocument['_id']
  userAgent: string
  isValid: boolean
  createdAt: Date
  updatedAt: Date
}

const SessionModel = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userAgent: String,
    isValid: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const Session = model<SessionDocument>('Session', SessionModel)
