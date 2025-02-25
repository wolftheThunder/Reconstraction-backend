const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
        static associate(models) {
        }
    }

    Project.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 255] 
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [10, 5000] 
            }
        },
        mainImage: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        subImages: {
            type: DataTypes.JSON,  // ✅ Change from TEXT to JSON
            allowNull: true,
            defaultValue: []
        }
    }, {
        sequelize,
        modelName: 'Project',
        tableName: 'projects',
        timestamps: true
    });

    return Project;
};
