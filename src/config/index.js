import 'dotenv/config'
import path from 'path'

const config = {
  all: {
    app: 'authentication-api',
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 5001,
    redis: {
      port: process.env.REDIS_PORT || '6379',
      url: process.env.REDIS_URL || 'topspin.space',
      password: process.env.REDIS_PASSWORD || 'Paranat432018Topspin'
    },
    redisHost: 'redis://:Paranat432018Topspin@topspin.space:6379',
    mongo: {
      uri: 'mongodb://Paranat432018Topspin:Paranat432018Topspin@topspin.space:2277/authentication-api?authSource=admin',
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 5000
      }
    },
  }
}

export default config