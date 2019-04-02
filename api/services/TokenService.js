import jwt from 'jsonwebtoken';

require('dotenv').config();

class TokenService {
    createToken(payload, expiresIn = '7d') {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    }
}

const service = new TokenService();
module.exports = service;
