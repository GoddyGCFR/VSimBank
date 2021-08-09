import { object, string, number, bool, array } from 'yup'

export const accountSchema = object({
  body: object({
    balance: number(),
    accountType: string(),
    accountStatus: object({
      onHold: bool(),
      isActive: bool(),
      isSuspended: bool(),
    }),
    violations: array().of(
      object({
        message: string(),
        level: string().oneOf(['LOW', 'MID', 'HIGH'], 'Must be either "LOW", "MID", or "HIGH"'),
      })
    ),
  }),
})
