   // src/config/db.js

   const { Sequelize } = require('sequelize');
   const dotenv = require('dotenv');

   dotenv.config();

   console.log('Database Configuration:', {
     DB_NAME: process.env.DB_NAME,
     DB_USER: process.env.DB_USER,
     DB_PASSWORD: process.env.DB_PASSWORD,
     DB_HOST: process.env.DB_HOST,
   });

   const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
     host: process.env.DB_HOST,
     dialect: 'mysql', 
   });

   const testConnection = async () => {
     try {
       await sequelize.authenticate();
       console.log('Database connection has been established successfully.');
     } catch (error) {
       console.error('Unable to connect to the database:', error);
     }
   };

   testConnection();

   module.exports = sequelize;