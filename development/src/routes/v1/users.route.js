'use strict'

const validator = require('express-joi-validation').createValidator()
const express = require('express')
const router = express.Router()

const controller = require('../../controllers/v1/users.controller')
const validation = require('../../validations/v1/user.validation')
const auth = require('../../middlewares/v1/auth.middleware')

// http method

router.route('/')
  .get(
    auth.check,
    controller.get
  )
  .post(
    validator.body(validation.create),
    controller.create
  )

router.route('/profiles')
  .put(
    auth.check,
    controller.updateProfile
  )
  .delete(
    auth.check,
    controller.clearProfile
  )

router.route('/:id')
  // put : 수정
  // body: password
  .put(controller.update)
  // delete : 삭제
  .delete(controller.destroy)

module.exports = router
