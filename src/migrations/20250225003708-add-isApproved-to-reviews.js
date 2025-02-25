'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Reviews', 'isApproved', {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false, 
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Reviews', 'isApproved');
    }
};