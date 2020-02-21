'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tags')
  }
}
