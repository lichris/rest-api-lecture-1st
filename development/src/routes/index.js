var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  return res.json({ message: 'pong' })
})

module.exports = router
