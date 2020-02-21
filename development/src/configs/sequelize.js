'use strict'

// eslint-disable-next-line newline-per-chained-call
require('dotenv').config()

if (process.env.NODE_ENV !== 'production') {
  require('@babel/register')
}

const dialect = 'mysql'

const pool = {
  max: process.env.NODE_ENV === 'production' ? 50 : 10,
  min: process.env.NODE_ENV === 'production' ? 50 : 1,
  idle: process.env.NODE_ENV === 'production' ? 50 : 10
}

const define = {
  charset: 'utf8mb4',
  collate: 'utf8mb4_900_ai',
  timestamps: true
}

module.exports = {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PW,
    database: process.env.DEV_DB,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    dialect,
    timezone: '+09:00',
    pool,
    define,
    logging: process.env.DEV_DB_LOGGING === 'true'
  },
  test: {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PW,
    database: process.env.TEST_DB,
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,
    dialect,
    timezone: '+09:00',
    pool,
    define,
    logging: process.env.TEST_DB_LOGGING === 'true'
  },
  production: {
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PW,
    database: process.env.PROD_DB,
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    dialect,
    timezone: '+09:00',
    pool,
    define,
    logging: process.env.PROD_DB_LOGGING === 'true'
  }
}
