'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../../controllers/v1/auth.controller')

router.route('/login')
  .post(controller.login)

module.exports = router