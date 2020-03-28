'use strict'

module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define(
    'UserProfile',
    {
      userId: {
        references: {
          model: 'users',
          key: 'id'
        },
        unique: true,
        type: DataTypes.INTEGER.UNSIGNED
      },
      profileImg: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING
      },
      greeting: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING
      }
    },
    {
      tableName: 'user_profiles',
      timestamps: false
    }
  )

  UserProfile.associate = function (models) {
    UserProfile.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    })
  }

  return UserProfile
}
