module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Records', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true,
        },
        claim_id: {
            allowNull: false,
            type: Sequelize.UUID,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }),

    down: queryInterface => queryInterface.dropTable('Records'),
};
