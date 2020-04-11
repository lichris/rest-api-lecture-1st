const uuid = require('uuid')

module.exports.generate = () => {
  try {
    const oUuid4 = uuid.v4().split('-')

    return oUuid4[2] + oUuid4[1] + oUuid4[0] + oUuid4[3] + oUuid4[4]
  } catch (err) {
    throw err
  }
}