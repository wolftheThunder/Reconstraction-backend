'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Reviews', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            projectId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Projects',
                    key: 'id',
                },
                allowNull: false,
                onDelete: 'CASCADE', // ✅ Ensures reviews are deleted when a project is deleted
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            rating: {  // ✅ Replaces 'position' with 'rating'
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5
                }
            },
            quote: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            isApproved: {  // ✅ Added isApproved field for admin moderation
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Reviews');
    }
};
