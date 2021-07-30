import { object, string, date } from 'yup'

const createProfileSchema = object({
  body: object({
    firstName: string().required('First name is required'),
    lastName: string().required('First name is required'),
    middleName: string(),
    nickName: string(),
    address: string().required('Address is required'),
    dob: date().required('DOB is required'),
    state: string().required('State is required'),
    city: string().required('City is required'),
    country: string().required('Country is required'),
    user: string().uuid('Must be a valid User ID'),
  }),
})

const updateProfileSchema = object({
  body: object({
    firstName: string(),
    lastName: string(),
    middleName: string(),
    nickName: string(),
    address: string(),
    dob: date(),
    state: string(),
    city: string(),
    country: string(),
    user: string().uuid('Must be a valid User ID'),
  }),
})

export { createProfileSchema, updateProfileSchema }
