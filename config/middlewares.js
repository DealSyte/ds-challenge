import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import R from 'ramda';
import cors from 'cors';

const env = process.env.NODE_ENV;
const empty = (req, res, next) => { next(); };
// Define a list of middleware
const middlewares = [
    cors(),
    passport.initialize(),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    env !== 'test' ? morgan('dev') : empty,
    
];

// Set a list of middleware inside express app
const set = (app) => {
    const setMiddlewares = R.forEach(middleware => app.use(middleware));
    if (middlewares && Array.isArray(middlewares) && middlewares.length > 0) {
        setMiddlewares(middlewares);
    }
    return app;
};

export default set;
