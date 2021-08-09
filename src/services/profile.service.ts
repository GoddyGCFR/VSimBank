import { DocumentDefinition, FilterQuery, Query, UpdateQuery, UpdateWriteOpResult } from 'mongoose'
import { Profile, ProfileDocument } from '../models/profile.model'

export const createProfile = async (input: DocumentDefinition<ProfileDocument>): Promise<ProfileDocument> => Profile.create(input)

export const updateProfile = async (
  filter: FilterQuery<ProfileDocument>,
  update: UpdateQuery<ProfileDocument>
): Promise<Query<UpdateWriteOpResult, ProfileDocument>> => Profile.updateOne(filter, update)

export const findProfile = async (filter: FilterQuery<ProfileDocument['user']>): Promise<ProfileDocument | null> =>
  Profile.findOne(filter)
