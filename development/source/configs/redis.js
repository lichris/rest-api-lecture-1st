const Redis = require('ioredis')
const client = new Redis({
  port: process.env.REDIS_PORT
})

module.exports = client