// models/Project.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Project extends Model {
    static associate(models) {
      // Define associations here
      Project.hasMany(models.Review, {
        foreignKey: 'projectId',
        as: 'reviews',
        onDelete: 'CASCADE',
      });
    }
  }

  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      mainImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subImages: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: 'Project',
      tableName: 'projects',
      timestamps: true,
    }
  );

  return Project;
};
