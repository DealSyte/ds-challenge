/* eslint no-undef:0 */
import sinon from 'sinon';
import sinonchai from 'sinon-chai';
import chai, { expect } from 'chai';
import assertArrays from 'chai-arrays';
import { mockReq, mockRes } from 'sinon-express-mock';
import app from '../../../server';
import AuthorizationPolicies from '../../../api/policies/AuthorizationPolicies';
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

describe('AuthorizationPolicies', () => {
    describe('isRol', () => {
        let res = null;
        beforeEach(function () {
            res = mockRes();
        });
        it('should return a function when is Called', async () => {
            const req = mockReq()
            const next = sinon.spy();
           
            const result = AuthorizationPolicies.isRol(['user','admin']);
            expect(result).to.be.an('function');
        });
        it('should call next with UnauthorizedRol code with not maching roles is passed', async () => {
            const req = mockReq({ user: { rol: 'admin' } })
            const next = sinon.spy();
           
            const result = AuthorizationPolicies.isRol('user');
            expect(result).to.be.an('function');
            await result(req, res, next)
            expect(next).to.be.have.been.calledWith(sinon.match({
                "fullContent": {
                    code: 'UnauthorizedRol',
                    message: 'Invalid Rol for this action',
                }
            }))
        });
        it('should call next with no arguments when rol validation pass', async () => {
            const req = mockReq({ user: { rol: 'admin' } })
            const next = sinon.spy();
           
            const result = AuthorizationPolicies.isRol('admin');
            expect(result).to.be.an('function');
            await result(req, res, next)
            expect(next).to.be.have.been.calledWith();
        });
    });
});