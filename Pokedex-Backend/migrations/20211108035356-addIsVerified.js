'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn('users', "is_verified",{type: Sequelize.DataTypes.BOOLEAN });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('users',"is_verified")
  }
};
