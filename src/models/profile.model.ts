import { Schema, model, Document } from 'mongoose'
import { UserDocument } from './user.model'

export interface ProfileDocument extends Document {
  firstName: string
  lastName: string
  middleName: string
  nickName: string
  dob: string
  address: string
  state: string
  city: string
  country: string
  user: UserDocument['_id']
}

const ProfileSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  nickName: {
    type: String,
  },
  dob: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
})

export const Profile = model<ProfileDocument>('Profile', ProfileSchema)
