module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Stories', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true,
        },
        record_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        question: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        answer: {
            type: Sequelize.STRING,
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

    down: queryInterface => queryInterface.dropTable('Stories'),
};
