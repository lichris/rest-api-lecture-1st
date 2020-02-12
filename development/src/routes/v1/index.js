const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  return res.json({ message: '서버 살아있음' })
})

router.use('/users', require('./users.route'))

module.exports = router