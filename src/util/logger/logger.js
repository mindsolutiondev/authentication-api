import bunyan from 'bunyan'
import config from '../../config'

const options = {
  name: config.all.app,
  streams: [
    {
      type: 'stream',
      stream: process.stdout,
      level: 'debug',
    },
  ],

  serializers: bunyan.stdSerializers,
}
const logger = bunyan.createLogger(options)

export default logger
