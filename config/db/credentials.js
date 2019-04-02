require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

module.exports = {
	development: {
		username: process.env.DB_USERNAME || 'root',
		password: process.env.DB_PASSWORD || 'root',
		database: process.env.DB_DATABASE || 'prueba',
		host: process.env.DB_HOST || 'localhost',
		port: 5432,
		dialect: 'postgres',
	},
	test: {
		username: process.env.DB_USERNAME || 'root',
		password: process.env.DB_PASSWORD || 'root',
		database: process.env.DB_DATABASE || 'database_test',
		host: process.env.DB_HOST || 'localhost',
		port: 5432,
		dialect: 'postgres',
	},
	production: {
		username: 'root',
		password: null,
		database: 'database_production',
		host: '127.0.0.1',
		port: 5432,
		dialect: 'postgres',
	},
	getCredentials() {
		const {
 username, password, database, host, port, dialect,
} = this[env];
		return `${dialect}://${username}:${password}@${host}:${port}/${database}`;
	},
};
