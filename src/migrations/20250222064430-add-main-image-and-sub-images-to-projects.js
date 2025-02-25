   // migrations/xxxx-add-main-image-and-sub-images-to-projects.js
   'use strict';

   module.exports = {
       up: async (queryInterface, Sequelize) => {
           await queryInterface.addColumn('Projects', 'mainImage', {
               type: Sequelize.STRING,
               allowNull: true, 
           });
           await queryInterface.addColumn('Projects', 'subImages', {
               type: Sequelize.JSON,
               allowNull: true, 
           });
       },
       down: async (queryInterface, Sequelize) => {
           await queryInterface.removeColumn('Projects', 'mainImage');
           await queryInterface.removeColumn('Projects', 'subImages');
       }
   };