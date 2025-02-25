'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Remove 'images' column if it exists
        await queryInterface.describeTable('Projects').then(async (tableDefinition) => {
            if (tableDefinition.images) {
                await queryInterface.removeColumn('Projects', 'images');
            }
        });

        // Add 'mainImage' column only if it doesn't exist
        await queryInterface.describeTable('Projects').then(async (tableDefinition) => {
            if (!tableDefinition.mainImage) {
                await queryInterface.addColumn('Projects', 'mainImage', {
                    type: Sequelize.STRING,
                    allowNull: true,
                });
            }
        });

        // Add 'subImages' column only if it doesn't exist
        await queryInterface.describeTable('Projects').then(async (tableDefinition) => {
            if (!tableDefinition.subImages) {
                await queryInterface.addColumn('Projects', 'subImages', {
                    type: Sequelize.JSON,
                    allowNull: true,
                });
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Projects', 'mainImage');
        await queryInterface.removeColumn('Projects', 'subImages');

        await queryInterface.addColumn('Projects', 'images', {
            type: Sequelize.LONGTEXT,
            allowNull: false,
        });
    }
};
