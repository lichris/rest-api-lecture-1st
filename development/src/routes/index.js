const express = require('express')
const router = express.Router()

router.use('/v1', require('./v1'))

router.get('/asdf', async (req, res) => {
  const v1Models = require('../models/v1')

  try {
    const a = await v1Models.sequelize.query('select * from users', { type: v1Models.Sequelize.QueryTypes.SELET })
    return res.json({ a })
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
