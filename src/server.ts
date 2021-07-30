import 'express-async-errors'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import router from './routes/router'
import { errorHandler, decodeUser } from './middlewares'
import { connectDB } from './startup'
import { log } from './utils'

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors({ origin: true, credentials: true }))

app.use(decodeUser)

app.use('/api/v1', router)

// @ts-ignore
app.use('*', (req: Request, res: Response) =>
  res.send(`Virtual Digital Banking - v.0.1.0 ${`${new Date().toDateString()} - ${new Date().toLocaleTimeString()}`}`)
)

app.use(errorHandler)

const PORT: number = (process.env.PORT as unknown as number) ?? (process.env.SERVER_PORT as unknown as number)

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      log.info(`Server Running on Port: ${PORT}`)
    })
  })
  .catch(() => log.error('FAILED!!!'))
