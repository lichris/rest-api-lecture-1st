'use strict'

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
    User.hasOne(models.User, {
      as: 'profile',
      foreignKey: 'userId'
    })

    User.hasMany(models.Question, {
      as: 'questions',
      foreignKey: 'userId'
    })
  }

  return User
}
