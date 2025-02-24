   // migrations/xxxx-add-main-image-and-sub-images-to-projects.js
   'use strict';

   module.exports = {
       up: async (queryInterface, Sequelize) => {
           await queryInterface.addColumn('Projects', 'mainImage', {
               type: Sequelize.STRING,
               allowNull: true, // Allow null if no main image is provided
           });
           await queryInterface.addColumn('Projects', 'subImages', {
               type: Sequelize.JSON,
               allowNull: true, // Allow null if no sub-images are provided
           });
       },
       down: async (queryInterface, Sequelize) => {
           await queryInterface.removeColumn('Projects', 'mainImage');
           await queryInterface.removeColumn('Projects', 'subImages');
       }
   };