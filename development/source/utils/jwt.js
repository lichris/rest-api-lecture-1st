const jwt = require('jsonwebtoken')

module.exports.generate = (payload) => {
  try {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_TTL
      }
    )
  } catch (err) {
    throw err
  }
}

module.exports.check = (token) => {
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET
    )
  } catch (err) {
    throw err
  }
}