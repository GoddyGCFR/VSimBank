import { object, string, ref } from 'yup'

const createUserSchema = object({
  body: object({
    username: string().required('Valid phone number is required'),
    email: string().email('Must be a valid email address').required('Email is required'),
    password: string()
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin characters')
      .required('Password is required')
      .min(6, 'Password too short. Minimum of 6 characters allowed'),
    passwordConfirmation: string()
      .oneOf([ref('password'), null], 'Password do not match')
      .required('Confirm password cannot be blank'),
  }),
})

export { createUserSchema }
