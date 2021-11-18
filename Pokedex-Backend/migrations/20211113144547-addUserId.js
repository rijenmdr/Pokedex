'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn('favourites', "user_id",{type: Sequelize.DataTypes.INTEGER });

  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('favourites',"user_id")
  }
};
