import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * @class JwtStrategy
 * @description This class represents an auth strategy and is responsible of
 * validate the accessTokens sended by the users
 * @author Antonio Mejias
 */
class JwtStrategy extends Strategy {
    constructor() {
        super(JwtStrategy.options(), JwtStrategy.verify);
    }

    static options() {
        return {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        };
    }

    /**
   * @method verify
   * @description This method is the responsible of validate the tokens of the
   * users
   * @param {string} accessToken is a bearer access token
   * @author Antonio Mejias
   */
    static verify(payload, done) {
        if (payload) {
            return done(null, payload);
        }
        return done(new Error('Invalid token'), null);
    }
}

module.exports = JwtStrategy;
