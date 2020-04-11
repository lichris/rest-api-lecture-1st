'use strict'

const Joi = require('@hapi/joi')

module.exports.create = Joi.object({
  nickname: Joi.string().max(20)
    .required(),
  password: Joi.string().required()
})