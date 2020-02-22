const HttpStatusCodes = require('http-status-codes')

const v1Models = require('../../models/v1')
const jwt = require('../../utils/jwt')

module.exports.login = async (req, res, next) => {
  try {
    const id = req.body.id
    const password = req.body.password

    const user = await v1Models.User.findByPk(id)

    if (!user) {
      return res.status(HttpStatusCodes.NOT_FOUND)
        .json({ message: '사용자를 찾을 수 없습니다.' })
    }

    if (await user.checkPassword(password)) {
      const token = jwt.generate({ id, nickname: user.nickname })

      return res.status(HttpStatusCodes.OK)
        .json({
          data: {
            token
          }
        })
    }
  } catch (err) {
    next(err)
  }
}