/* eslint no-undef:0 */
import sinon from 'sinon';
import sinonchai from 'sinon-chai';
import chai, { expect } from 'chai';
import assertArrays from 'chai-arrays';
import { mockReq, mockRes } from 'sinon-express-mock';
import R from 'ramda';
import app from '../../../server';
import ClaimController from '../../../api/controllers/ClaimController';
import claim from '../fixtures/claim';
import Claim from '../../../api/models/Claim';

const { created, allClaims, claimById } = claim;
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

describe('ClaimController', () => {
    let res = null;
    beforeEach(function () {
        res = mockRes();
    });
    describe('create', () => {
        it('should call res.json with the response of Claim.create method', async () => {
            const claimerId = 2;
            const body = {
                "flight_code": "U2TOCH8Y",
                "description":"Tengo un problema y quisiera ser atendido"
            }
            const req = mockReq({
                user: {
                    id: claimerId,
                },
                body
            })
            sandbox.spy(R, 'merge');
            // Mock the getByClaim method to avoid side effects
            sandbox.stub(Claim, 'create').resolves(created);

            await ClaimController.create(req, res);
            expect(R.merge).to.be.have.been.calledOnce;
            expect(Claim.create).to.be.have.been.calledOnceWithExactly({ ...body, claimerId });
            expect(res.json).to.be.have.been.calledOnceWithExactly(201, created);
        });
    });
    describe('getAll', () => {
        it('should call res.json with the response of Claim.getAll method', async () => {
            const query = { flight_code: "U2TOCH8Y" }
            const req = mockReq({ query })

            sandbox.stub(Claim, 'getAll').resolves(allClaims);

            await ClaimController.getAll(req, res);
            expect(Claim.getAll).to.be.have.been.calledOnceWithExactly(query);
            expect(res.json).to.be.have.been.calledOnceWithExactly(allClaims);
        });
    });
    describe('getMyClaim', () => {
        it('should call res.json with the response of Claim.giveMeMy method', async () => {
            const claimerId = 2;
            const req = mockReq({
                user: {
                    id: claimerId,
                }
            })

            sandbox.stub(Claim, 'giveMeMy').resolves(allClaims);

            await ClaimController.getMyClaim(req, res);
            expect(Claim.giveMeMy).to.be.have.been.calledOnceWithExactly(claimerId);
            expect(res.json).to.be.have.been.calledOnceWithExactly(allClaims);
        });
    });
    describe('getById', () => {
        it('should call res.json with the response of Claim.getByIdAndUser method', async () => {
            const claimId = "2c949c57-6d20-4eca-b5d1-3bfe756b5284";
            const userId = 2;
            const req = mockReq({
                params: {
                    claimId,
                },
                user: {
                    id: userId
                }
            })

            sandbox.stub(Claim, 'getByIdAndUser').resolves(claimById);

            await ClaimController.getById(req, res);
            expect(Claim.getByIdAndUser).to.be.have.been.calledOnceWithExactly(claimId, userId);
            expect(res.json).to.be.have.been.calledOnceWithExactly(claimById);
        });
    });
    describe('assign', () => {
        it('should call res.send with 204 and Claim.assignToAttendant', async () => {
            const claimId = "2c949c57-6d20-4eca-b5d1-3bfe756b5284";
            const attendantId = 1;
            const req = mockReq({
                params: {
                    claimId,
                },
                user: {
                    id: attendantId
                }
            })

            sandbox.stub(Claim, 'assignToAttendant').resolves(true);

            await ClaimController.assign(req, res);
            expect(Claim.assignToAttendant).to.be.have.been.calledOnceWithExactly(claimId, attendantId);
            expect(res.send).to.be.have.been.calledOnceWithExactly(204);
        });
    });
    describe('close', () => {
        it('should call res.send with 204 and Claim.close', async () => {
            const claimId = "2c949c57-6d20-4eca-b5d1-3bfe756b5284";
            const attendantId = 1;
            const req = mockReq({
                params: {
                    claimId,
                },
                user: {
                    id: attendantId
                }
            })

            sandbox.stub(Claim, 'close').resolves(true);

            await ClaimController.close(req, res);
            expect(Claim.close).to.be.have.been.calledOnceWithExactly(claimId, attendantId);
            expect(res.send).to.be.have.been.calledOnceWithExactly(204);
        });
    });
    describe('remove', () => {
        it('should call res.send with 204 and Claim.remove', async () => {
            const claimId = "2c949c57-6d20-4eca-b5d1-3bfe756b5284";
            const req = mockReq({
                params: {
                    claimId,
                }
            })

            sandbox.stub(Claim, 'remove').resolves(true);

            await ClaimController.remove(req, res);
            expect(Claim.remove).to.be.have.been.calledOnceWithExactly(claimId);
            expect(res.send).to.be.have.been.calledOnceWithExactly(204);
        });
    });
});