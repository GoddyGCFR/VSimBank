import { DocumentDefinition, FilterQuery, LeanDocument } from 'mongoose'
import Account, { AccountDocument } from '../models/account.model'

export const createAccount = (input: DocumentDefinition<AccountDocument>): Promise<LeanDocument<AccountDocument>> =>
  Account.create(input)

export const findAccount = (filter: FilterQuery<AccountDocument>): Promise<LeanDocument<AccountDocument> | null> =>
  Account.findOne(filter)
