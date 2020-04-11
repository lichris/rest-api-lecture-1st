'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      userId: {
        references: {
          model: 'users',
          key: 'id'
        },
        unique: true,
        type: Sequelize.INTEGER.UNSIGNED,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      profileImg: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING
      },
      greeting: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_profiles')
  }
}
