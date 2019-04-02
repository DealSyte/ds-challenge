/* eslint no-undef:0 */
import sinon from 'sinon';
import sinonchai from 'sinon-chai';
import chai, { expect } from 'chai';
import assertArrays from 'chai-arrays';
import { mockReq, mockRes } from 'sinon-express-mock';
import app from '../../../server';
import RecordController from '../../../api/controllers/RecordController';
import record from '../fixtures/record';
import Record from '../../../api/models/Record';

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

describe('RecordController', () => {
    describe('get', () => {
        let res = null;
        beforeEach(function () {
            res = mockRes();
        });
        it('should call res.json with the response of getByClaim method', async () => {
            const claimId = 1234567
            const req = mockReq({
                params: {
                    claimId
                }
            })
            // Mock the getByClaim method to avoid side effects
            sandbox.stub(Record, 'getByClaim').resolves(record);

            await RecordController.get(req, res);
            
            expect(Record.getByClaim).to.be.have.been.calledOnceWithExactly(claimId);
            expect(res.json).to.be.have.been.calledOnceWithExactly(record);
        });
    });
});