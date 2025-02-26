const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Review extends Model {
        static associate(models) {
            Review.belongsTo(models.Project, {
                foreignKey: 'projectId',
                as: 'project',
                onDelete: 'CASCADE',
            });
        }
    }

    Review.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            projectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Projects',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5,
                },
            },
            quote: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            isApproved: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Review',
            tableName: 'reviews',
            timestamps: true,
        }
    );

    return Review;
};