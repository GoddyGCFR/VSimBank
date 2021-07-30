import { Router } from 'express'
import { createUserHandler } from '../controllers/user.controller'
import { validation, authUser } from '../middlewares'
import { createUserSchema } from '../schemas/user.schema'
import { createProfileSchema } from '../schemas/profile.schema'
import { createProfileHandler } from '../controllers/profile.controller'
import { createSessionHandler, deleteSessionHandler, getSessionHandler } from '../controllers/session.controller'
import { createSessionSchema } from '../schemas/session.schema'

export default (() => {
  const router = Router()

  router.route('/users').post(validation(createUserSchema), createUserHandler)
  router
    .route('/sessions')
    .post(validation(createSessionSchema), createSessionHandler)
    .get(authUser, getSessionHandler)
    .delete(authUser, deleteSessionHandler)

  router.route('/profiles').post([authUser, validation(createProfileSchema)], createProfileHandler)

  return router
})()
