const v1Models = require('../../models/v1')

module.exports.get = async (req, res, next) => {
  try {
    const users = await v1Models.User.findAll()

    return res.json({ users })
  } catch (err) {
    next(err)
  }
}