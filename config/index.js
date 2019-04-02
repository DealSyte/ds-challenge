import './log';
import R from 'ramda';
import middlewares from './middlewares';
import web from './web';
import error from './errors';
import router from './router';
import db from './db';
import passport from './passport';

/* Graceful Shutdown our Http Server */
const gracefulShutdown = async (database) => {
    // close the db connection gracefully when the process is ended by an specific signal
    try {
        await database.close();
        winston.info('The connection to the DB was closed gracefully');
        process.exit(0);
    } catch (err) {
        winston.error('Error closing the DB connection');
        process.exit(1);
    }
}; 

const SIGNALS = ['SIGINT', 'SIGQUIT', 'SIGTERM'];

const setSignals = gracefully => R.reduce((process, signal) => {
    // Remove all the previous listener to avoid an unnecessary memory leak;
    process.removeAllListeners(signal);
    // Set new listener to execute the gracefulShutdown function
    process.on(signal, gracefully);
    // return the accumulator
    return process;
}, process);

export default {
    setAppConfig: R.compose(
        error,
        router,
        middlewares,
    ),
    startServer(app) {
        return new Promise(async (resolve, reject) => {
            try {
                const sequelize = await db.startConnection();
                winston.info('DB connection has been established successfully.');
                const server = app.listen(web.port, '0.0.0.0', async (err) => {
                    if (err) {
                        // In case of an error, close the previous connection
                        await sequelize.connectionManager.close();
                        throw err;
                    } 
                    setSignals(gracefulShutdown.bind(null, sequelize))(SIGNALS);
                    passport.loadStrategies();
                    winston.info(`Server is running on port ${web.port} :)`);
                    resolve(server);
                });
            } catch (err) {
                winston.error(err);  
                reject(err);
            }
        });
    },
};
