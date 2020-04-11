const redis = require('../configs/redis')
const v1Models = require('../models/v1')

module.exports.load = async (id) => {
  try {
    let user = await redis.get(`users:${id}`)

    if (!user) {
      user = await v1Models.User.findByPk(id, {
        include: [
          {
            model: v1Models.UserProfile,
            as: 'profile'
          }
        ]
      })

      user = JSON.stringify(user)

      await redis.set(`users:${id}`, user, 'EX', 300)
    }
  
    return JSON.parse(user)
  } catch (err) {
    throw err
  }
}