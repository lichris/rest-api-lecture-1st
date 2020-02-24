'use strict'

const _ = require('lodash')
const v1Models = require('../../models/v1')

module.exports.get = async (req, res, next) => {
  try {
    return res.json({ data: { user: req.user } })
  } catch (err) {
    next(err)
  }
}

module.exports.create = async (req, res, next) => {
  try {
    const user = await v1Models.User.create(req.body)

    return res.json({ user })
  } catch (err) {
    next(err)
  }
}

module.exports.update = (req, res, next) => {
  if (req.body.password) {
    // single action 업데이트
    v1Models.User.update({
      password: req.body.password
    }, {
      where: {
        id: req.params.id
      }
    })
      .catch(err => { throw (err) })
  }

  return res.json({ message: '비밀번호를 수정했습니다.' })
}

module.exports.destroy = (req, res, next) => {
  v1Models.User.destroy({
    where: {
      id: req.params.id
    }
  })
    .catch(err => { throw (err) })

  return res.json({ message: '사용자를 삭제했습니다.' })
}

module.exports.createUserProfile = async (req, res, next) => {
  try {
  } catch (err) {
    next(err)
  }
}