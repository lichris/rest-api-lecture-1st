'use strict'

module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    'Question',
    {
      userId: {
        references: {
          model: 'users',
          key: 'id'
        },
        type: DataTypes.INTEGER.UNSIGNED
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      tableName: 'questions',
      timestamps: true
    }
  )

  Question.associate = function (models) {
    Question.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    })

    Question.belongsToMany(models.Tag, {
      as: 'tags',
      through: 'PivotQuestionTag',
      foreignKey: 'questionId',
      otherKey: 'tagId'
    })
  }

  return Question
}
