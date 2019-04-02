export default {
    dialect: 'postgres',
    pool: {
        max: 1,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
	logging: console.log,
};
