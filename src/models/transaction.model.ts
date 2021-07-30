import { Schema, model } from 'mongoose'

const TransactionSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    purpose: {
      type: String,
    },
    amount: {
      type: Number,
      default: 0.0,
      required: true,
    },
    txType: {
      type: String,
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

export default model('Transaction', TransactionSchema)
