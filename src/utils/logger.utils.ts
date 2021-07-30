// import { createLogger, format, transports } from 'winston'
import logger from 'pino'

// const logger = createLogger({
//   level: 'info',
//   format: format.json(),
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     //
//     // - Write all logs with level `error` and below to `error.log`
//     // - Write all logs with level `info` and below to `combined.log`
//     //
//     new transports.File({ filename: 'error.log', level: 'error' }),
//     new transports.File({ filename: 'combined.log' }),
//   ],
// })

const log = logger({
  prettyPrint: true,
  base: { pid: false },
  timestamp: () => `"time": ${new Date().toUTCString()}`,
})

export default log
