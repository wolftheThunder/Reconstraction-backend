// models/Admin.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Admin extends Model {}

  Admin.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Admin',
      tableName: 'admins', // Ensure this matches your actual table name
      timestamps: true, // Adjust according to your schema
    }
  );

  return Admin;
};
