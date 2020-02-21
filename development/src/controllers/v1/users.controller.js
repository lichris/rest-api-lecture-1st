'use strict'

const _ = require('lodash')
const v1Models = require('../../models/v1')

module.exports.get = async (req, res, next) => {
  try {
    // 1. query 가 없으면 getAll
    if (_.isEmpty(req.query)) {
      const users = await v1Models.User.findAll()
      return res.json({ users })
    }

    let options = {
      where: {}
    }

    // 2. query id 가 있으면 getbyid
    if (req.query.id) {
      options.where.id = req.query.id
    }

    if (req.query.nickname) {
      options.where.nickname = req.query.nickname
    }

    const user = await v1Models.User.findOne(options)

    if (!user) {
      return res.status(404)
        .json({ message: '사용자를 찾을 수 없습니다.' })
    }

    return res.json({ user })
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
    }).catch(err => { throw (err) })
  }

  return res.json({ message: '비밀번호를 수정했습니다.' })
}

module.exports.destroy = (req, res, next) => {
  v1Models.User.destroy({
    where: {
      id: req.params.id
    }
  }).catch(err => { throw (err) })

  return res.json({ message: '사용자를 삭제했습니다.' })
}

module.exports.createUserProfile = async (req, res, next) => {
  try {
  } catch (err) {
    next(err)
  }
}