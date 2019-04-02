module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Claims', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
        },
        flight_code: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
                len: 8,   
            },
        },
        ticket_number: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        claimerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        attendantId: {
            type: Sequelize.INTEGER,
        },
        status: {
            type: Sequelize.ENUM,
            values: ['pending', 'wip', 'resolved'],
            allowNull: false,
        },
        record_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
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

    down: queryInterface => queryInterface.dropTable('Claims'),
};
