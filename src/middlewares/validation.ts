import { AnySchema } from 'yup'
import { Request, Response, NextFunction } from 'express'
import { log } from '../utils'

export default (schema: AnySchema) =>
  async (req: Request, _: Response, next: NextFunction): Promise<void> => {
    await schema
      .validate({
        body: req.body,
        params: req.params,
        query: req.query,
      })
      .then(() => next())
      .catch((err) => {
        log.error(err)
        next(new Error(err))
      })
  }
