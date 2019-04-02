/* eslint no-undef:0 */
import sinon from 'sinon';
import sinonchai from 'sinon-chai';
import chai, { expect } from 'chai';
import assertArrays from 'chai-arrays';
import app from '../../../server';
import TokenService from '../../../api/services/TokenService';
import jwt from 'jsonwebtoken';
// import mocks from '../../fixtures/mocks';

chai.use(sinonchai);
chai.use(assertArrays);

let server;
before(async () => {
    try {
        server = await app;
    } catch (e) {
        winston.error(e);
    }
});

after(() => {
    server && server.close();
});

let sandbox;
beforeEach(() => {
    sandbox = sinon.createSandbox();
});

afterEach(() => {
    sandbox.restore();
});

describe('TokenService', () => {
    describe('createToken', () => {
        let res = null;
        const obj = { name: 'Antonio Mejias' };

        beforeEach(function () {
            // res = mockRes();
            sandbox.spy(jwt, 'sign')
        });
        it('should call jwt sign method', async () => {
            TokenService.createToken(obj);
            expect(jwt.sign).to.be.have.been.calledOnce;
            expect(jwt.sign).to.be.have.been.calledWithExactly(obj, process.env.JWT_SECRET, { expiresIn: '7d' });
        });
        it('should return a valid encrypted token', async () => {
            const token = TokenService.createToken(obj);
            const result = jwt.verify(token, process.env.JWT_SECRET);
            expect(result.name).to.be.equal(obj.name);
        });

    });
});