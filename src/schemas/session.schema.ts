import { object, string } from 'yup'

export const createSessionSchema = object({
  body: object({
    username: string().required('Phone number or email is required'),
    password: string()
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin characters')
      .required('Password is required')
      .min(6, 'Password too short. Minimum of 6 characters allowed'),
  }),
})
