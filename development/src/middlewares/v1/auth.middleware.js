'use strict'
const HttpStatusCodes = require('http-status-codes')

const jwt = require('../../utils/jwt')
const userRepo = require('../../repos/user.repo')

module.exports.check = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(HttpStatusCodes.FORBIDDEN)
        .json({ message: '권한이 없습니다.' })
    }

    const token = req.headers.authorization.split(' ')[1]

    let payload

    try {
      payload = jwt.check(token)
    } catch (err) {
      return res.status(HttpStatusCodes.FORBIDDEN)
        .json({ message: '토큰이 잘못 되었습니다.' })
    }

    const user = await userRepo.load(payload.id)

    if (!user) {
      return res.status(HttpStatusCodes.NOT_FOUND)
        .json({ message: '사용자를 찾을 수 없습니다.' })
    }

    req.user = user

    next()
  } catch (err) {
    next(err)
  }
}