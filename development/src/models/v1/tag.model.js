module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      tableName: 'tags',
      timestamps: false
    }
  )

  Tag.associate = function (models) {
    Tag.belongToMany(models.Question, {
      as: 'questions',
      through: 'PivotQuestionTag',
      foreignKey: 'tagId',
      otherKey: 'questionId'
    })
  }

  return Tag
}
