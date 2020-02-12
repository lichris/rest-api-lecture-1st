const express = require('express')
const router = express.Router()

const controller = require('../../controllers/v1/users.controller')

/* GET home page. */
router.get('/', controller.get)

module.exports = router
