import { Router } from 'express'
import { createUserHandler } from '../controllers/user.controller'
import { validation, authUser } from '../middlewares'
import { createUserSchema } from '../schemas/user.schema'
import { createProfileSchema, updateProfileSchema } from '../schemas/profile.schema'
import { createProfileHandler, updateProfileHandler } from '../controllers/profile.controller'
import { createSessionHandler, invalidateCurrentSessionHandler, getSessionHandler } from '../controllers/session.controller'
import { createSessionSchema } from '../schemas/session.schema'
import { accountSchema } from '../schemas/account.schema'
import { createAccountHandler } from '../controllers/account.controller'

export default (() => {
  const router = Router()

  router.route('/users').post(validation(createUserSchema), createUserHandler)

  router
    .route('/sessions')
    .post(validation(createSessionSchema), createSessionHandler)
    .get(authUser, getSessionHandler)
    .delete(authUser, invalidateCurrentSessionHandler)

  router
    .route('/profiles')
    .post([authUser, validation(createProfileSchema)], createProfileHandler)
    .patch([authUser, validation(updateProfileSchema)], updateProfileHandler)

  router.route('/accounts').post([authUser, validation(accountSchema)], createAccountHandler)

  return router
})()
