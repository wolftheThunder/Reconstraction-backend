// migrations/xxxx-modify-projects-table.js
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Drop the existing 'images' column
        await queryInterface.removeColumn('Projects', 'images');

        // Add 'mainImage' column if it doesn't exist
        await queryInterface.addColumn('Projects', 'mainImage', {
            type: Sequelize.STRING, // Use VARCHAR(255) equivalent
            allowNull: true, // Allow null if no main image is provided
        });

        // Add 'subImages' column if it doesn't exist
        await queryInterface.addColumn('Projects', 'subImages', {
            type: Sequelize.JSON, // Store an array of sub-image paths
            allowNull: true, // Allow null if no sub-images are provided
        });
    },
    down: async (queryInterface, Sequelize) => {
        // Revert the changes if needed
        await queryInterface.removeColumn('Projects', 'mainImage');
        await queryInterface.removeColumn('Projects', 'subImages');

        // Optionally, you can add back the 'images' column if needed
        await queryInterface.addColumn('Projects', 'images', {
            type: Sequelize.LONGTEXT, // Use LONGTEXT equivalent
            allowNull: false,
        });
    }
};