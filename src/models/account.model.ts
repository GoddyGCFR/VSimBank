import { Schema, model, Document } from 'mongoose'
import { UserDocument } from './user.model'

export interface AccountDocument extends Document {
  balance?: number
  accountType?: 'VBC' | 'NGN' | 'USD'
  accountStatus?: { onHold?: boolean; isActive?: boolean; isSuspended?: boolean }
  violations?: [{ message?: string; level?: 'LOW' | 'MID' | 'HIGH' }]
  user: UserDocument['_id']
}

const AccountSchema = new Schema(
  {
    balance: {
      type: Number,
      default: 0.0,
    },

    accountType: {
      type: String,
      unique: true,
      default: 'VBC',
      enum: ['VBC', 'NGN', 'USD'],
    },

    accountStatus: {
      onHold: { type: Boolean },
      isActive: { type: Boolean },
      isSuspended: { type: Boolean },
    },

    violations: [{ message: String, level: { type: String, enum: ['LOW', 'MID', 'HIGH'] } }],

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

const Account = model('Account', AccountSchema)

export default Account
