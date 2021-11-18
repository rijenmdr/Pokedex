'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return await queryInterface.bulkInsert(
     "Users",
     [
       {
         name:"Rijen Manandhar",
         email:"rijenmdr47@gmail.com",
         password:"rijmdr@123",
         createdAt:new Date(),
         updatedAt:new Date()
       }
     ],
     {}
   )
  },

  down: async (queryInterface, Sequelize) => {
  return await queryInterface.bulkDelete('Users', null, {});
  }
};
