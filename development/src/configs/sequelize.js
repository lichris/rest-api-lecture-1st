require('dotenv').config()

if (process.env.NODE_ENV !== 'production') {
  require('@babel/register')
}

const dialect = 'mysql'

const pool = {
  max: process.env.NODE_ENV === 'production' ? 1000 : 10,
  min: process.env.NODE_ENV === 'production' ? 50 : 1,
  idle: process.env.NODE_ENV === 'production' ? 10000 : 10
}

const define = {
  charset: 'utf8mb4',
  collate: 'utf8mb4_900_ai',
  timestamps: true
}

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DEV,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect,
    timezone: '+09:00',
    pool,
    define,
    logging: process.env.DB_LOGGING === 'true'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_TEST,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect,
    timezone: '+09:00',
    pool,
    define,
    // disable logging; default: console.log
    logging: false
  },
  production: {
    replication: {
      read: [
        {
          host: process.env.DB_HOST_SLV_1,
          username: process.env.DB_USER,
          password: process.env.DB_PW
        },
        {
          host: process.env.DB_HOST_SLV_2,
          username: process.env.DB_USER,
          password: process.env.DB_PW
        }
      ],
      write: {
        host: process.env.DB_HOST_MST,
        username: process.env.DB_USER,
        password: process.env.DB_PW
      }
    },
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dialect,
    timezone: '+09:00',
    pool,
    define,
    // disable logging; default: console.log
    logging: false
  }
}
