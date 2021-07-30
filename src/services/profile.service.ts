import { DocumentDefinition } from 'mongoose'
import { Profile, ProfileDocument } from '../models/profile.model'

export const createProfile = async (input: DocumentDefinition<ProfileDocument>): Promise<ProfileDocument> => Profile.create(input)
