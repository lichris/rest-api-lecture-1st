'use strict'

module.exports = (sequelize, DataTypes) => {
  const PivotQuestionTag = sequelize.define(
    'PivotQuestionTag',
    {
      questionId: {
        references: {
          model: 'questions',
          key: 'id'
        },
        type: DataTypes.INTEGER.UNSIGNED
      },
      tagId: {
        references: {
          model: 'tags',
          key: 'id'
        },
        type: DataTypes.INTEGER.UNSIGNED
      }
    },
    {
      tableName: 'pivot-question-tag',
      timestamps: false
    }
  )

  return PivotQuestionTag
}
