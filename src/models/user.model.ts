import { Document, HookNextFunction, model, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface UserDocument extends Document {
  id: string
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  // eslint-disable-next-line no-unused-vars
  comparePassword(userPassword: string): Promise<boolean>
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 6,
      maxlength: 20,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
      minlength: 6,
    },
  },
  { timestamps: true }
)

// eslint-disable-next-line func-names
UserSchema.pre('save', async function (next: HookNextFunction) {
  const user = this as UserDocument

  if (!user.isModified('password')) return next()

  const salt = await bcrypt.genSalt(11)
  user.password = await bcrypt.hash(user.password, salt)

  return next()
})

// eslint-disable-next-line func-names
UserSchema.methods.comparePassword = async function (userPassword: string) {
  const user = this as UserDocument
  return bcrypt.compare(userPassword, user.password).catch(() => false)
}

export default model<UserDocument>('User', UserSchema)
