var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  return res.json({ message: '와 진짜 신기하다!' })
})

module.exports = router
