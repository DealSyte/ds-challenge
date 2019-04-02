import config from './config';

/**
 * @class ErrorCore
 * @classdesc Error main core for the express app
 * @author Antonio Mejias 
 */
class ErrorCore {
    constructor() {
        config.buildErrors();
        this.globalErrorHandler = this.globalErrorHandler.bind(this);
    }

    /**
	 * @method notFoundRouter
	 * @description Catch every 404 request for the API
	 * @author AntonioMejias 
	 */
    notFoundRouter(req, res) {
        res.status(404).send({
            message: 'There is not a resource that matches with the request URI',
            endpoint: req.url,
            method: req.method,
        });
    }

    /**
	 * @method globalErrorHandler
	 * @description This global handler catch every error thrown by an async function
	 * @author AntonioMejias 
	 */
    globalErrorHandler(err, req, res) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('imprimir');
            winston.error(err);
        }
        const error = this.validateSequelizeError(err);
        res.status(error.status || 500).json(error.fullContent || error);
    }

    /**
	 * @method validateSequelizeError
	 * @description validate whether the error is a sequelize error
	 * @author AntonioMejias 
	 */
    validateSequelizeError(err) {
        switch (err.name) {
            case 'SequelizeValidationError': {
                return new SequelizeError('InvalidRequestPayload', err);
            }
            default: {
                return err;
            }
        }
    }
}

const error = new ErrorCore();

export default (app) => {
    app.use(error.notFoundRouter);
    app.use(error.globalErrorHandler);
    return app;
};
