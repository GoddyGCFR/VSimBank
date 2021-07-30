import { connect } from 'mongoose'
import { log } from '../utils'

export default () => {
  const dbUrl = process.env.DB_URL! as string

  return connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
      log.info('Database connection established')
    })

    .catch(() => {
      log.error("Can't connect to DB, server will now exit with error code (1)")
      process.exit(1)
    })
}
