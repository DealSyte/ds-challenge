/**
 * Passport Configuration
 *
 * * @description :: Passport will define which is going to be the authentication strategy
 * that the application will use.
 *
 */
import passport from 'passport';
import path from 'path';
import requireAll from 'require-all';
import R from 'ramda';

const strategyLoader = R.map(Strategy => passport.use(new Strategy()));
/**
  * @class PassportCore
  * @classdesc This class is for configure and load passport strategies
  * @author Antonio Mejias
  */
 class PassportCore {
    /**
     * @method loadStrategies
     * @description this method load and set the strategies
     * @author Antonio Mejias
     */
    loadStrategies() {
        const strategies = requireAll(this.strategiesPath);
        // console.log(strategies);
        strategyLoader(strategies);
        // this.bindToApp('passport',passport);
        // this.cano.passport = passport;
    }

    /**
     * @method strategiesPath
     * @description This method is a getter that return the absolute path where the
     * strategies are located
     * @author Antonio Mejias
     */
    get strategiesPath() {
        return path.join(__dirname, '../api/strategies');
    }
}

const core = new PassportCore();
export default core;
