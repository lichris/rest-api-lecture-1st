'use strict'

const bcrypt = require('bcrypt')

const SALT_ROUND = 10

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      nickname: {
        allowNull: false,
        type: DataTypes.STRING(20)
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      tableName: 'users',
      timestamps: true
    }
  )

  User.associate = function (models) {
    User.hasOne(models.UserProfile, {
      as: 'profile',
      foreignKey: 'userId'
    })

    User.hasMany(models.Question, {
      as: 'questions',
      foreignKey: 'userId'
    })
  }

  User.beforeSave(async (user) => {
    try {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(SALT_ROUND)
        // eslint-disable-next-line require-atomic-updates
        user.password = await bcrypt.hash(user.password, salt)
      }
    } catch (err) {
      throw err
    }
  })

  User.prototype.checkPassword = async function (password) {
    try {
      const isMatch = await bcrypt.compare(password, this.getDataValue('password'))

      return isMatch
    } catch (err) {
      throw err
    }
  }

  return User
}
