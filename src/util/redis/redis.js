import Redis from 'ioredis'
import config from '../../config/index'

const connectRedis = host => {
  const client = new Redis(host)
  client.on('error', error => {
    console.log('Redis connection error', error)
    // process.exit(1)
  })
  return client
}
export default connectRedis(config.all.redisHost)