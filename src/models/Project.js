const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
        static associate(models) {
            // Define associations here if needed
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
                len: [3, 255] // Ensure title is between 3 and 255 characters
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [10, 5000] // Ensure description is between 10 and 5000 characters
            }
        },
        mainImage: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        subImages: {
            type: DataTypes.TEXT,
            allowNull: true,
            get() {
                const raw = this.getDataValue('subImages');
                return raw ? JSON.parse(raw) : [];
            },
            set(value) {
                this.setDataValue('subImages', JSON.stringify(value || []));
            }
        }
    }, {
        sequelize,
        modelName: 'Project',
        tableName: 'projects',
        timestamps: true
    });

    return Project;
};