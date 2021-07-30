import { Schema, model } from 'mongoose'

const AccountSchema = new Schema({
  balance: {
    type: Number,
    default: 0.0,
  },

  accType: {
    unique: true,
    default: 'VBC',
    enum: ['VBC', 'NGN', 'USD'],
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export default model('Account', AccountSchema)
