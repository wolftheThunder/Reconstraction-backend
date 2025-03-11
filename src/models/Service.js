const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Service extends Model {
    static associate(models) {
    }
  }

  Service.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Title is required'
          },
          len: {
            args: [3, 100],
            msg: 'Title must be between 3 and 100 characters'
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Description is required'
          },
          len: {
            args: [10, 5000],
            msg: 'Description must be between 10 and 5000 characters'
          }
        }
      },
      beforeImage: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Before image is required'
          }
        }
      },
      afterImage: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'After image is required'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Service',
      tableName: 'services',
      timestamps: true,
    }
  );
  
  return Service;
};