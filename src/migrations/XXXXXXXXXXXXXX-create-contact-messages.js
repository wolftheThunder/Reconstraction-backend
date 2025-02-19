   // src/migrations/XXXXXXXXXXXXXX-create-contact-messages.js

   'use strict';

   module.exports = {
     up: async (queryInterface, Sequelize) => {
       await queryInterface.createTable('ContactMessages', {
         id: {
           type: Sequelize.INTEGER,
           autoIncrement: true,
           primaryKey: true,
         },
         firstName: {
           type: Sequelize.STRING,
           allowNull: false,
         },
         lastName: {
           type: Sequelize.STRING,
           allowNull: false,
         },
         company: {
           type: Sequelize.STRING,
           allowNull: true,
         },
         email: {
           type: Sequelize.STRING,
           allowNull: false,
         },
         phone: {
           type: Sequelize.STRING,
           allowNull: true,
         },
         message: {
           type: Sequelize.TEXT,
           allowNull: false,
         },
         agreed: {
           type: Sequelize.BOOLEAN,
           allowNull: false,
         },
         createdAt: {
           type: Sequelize.DATE,
           allowNull: false,
           defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
         },
         updatedAt: {
           type: Sequelize.DATE,
           allowNull: false,
           defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
         },
       });
     },

     down: async (queryInterface, Sequelize) => {
       await queryInterface.dropTable('ContactMessages');
     },
   };