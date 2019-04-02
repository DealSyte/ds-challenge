import { Strategy } from 'passport-local';
import TokenService from '../services/TokenService';

/**
 * Local Strategy Passport Configuration
 *
 * @class LocalStrategy
 * @author Antonio Mejias
 *
 */
class LocalStrategy extends Strategy {
    constructor() {
        super(LocalStrategy.options(), LocalStrategy.verify);
    }

    /**
     * @method options
     * @description This method is a getter for the options to configure the Strategy
     * @author Antonio Mejias
     */
    static options() {
        return {
            usernameField: 'email',
            passwordField: 'password',
            session: false,
        };
    }

    static async verify(email, password, done) {
        try {
            let user = await User.findOne({ where: { email }, attributes: ['id', 'rol', 'password'] });
            const isValid = await user.isValidPassword(password);

            if (!user || !isValid) {
                throw new AuthenticationError('InvalidCredentials', 'The credentials are invalids.');
            }

            user = user.toJSON();
            delete user.password;

            const accessToken = TokenService.createToken(user);

            return done(null, { accessToken });
        } catch (e) {
            return done(e, null);
        }
    }
}

module.exports = LocalStrategy;
