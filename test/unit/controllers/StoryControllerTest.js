/* eslint no-undef:0 */
import sinon from 'sinon';
import sinonchai from 'sinon-chai';
import chai, { expect } from 'chai';
import assertArrays from 'chai-arrays';
import { mockReq, mockRes } from 'sinon-express-mock';
import R from 'ramda';
import app from '../../../server';
import StoryController from '../../../api/controllers/StoryController';
import story from '../fixtures/story';
import Story from '../../../api/models/Story';

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

describe('StoryController', () => {
    describe('create', () => {
        let res = null;
        beforeEach(function () {
            res = mockRes();
        });
        it('should call res.json with the response of Story.create method', async () => {
            const record_id = 1234;
            const question = "¿cuando podria enviarme la información solicitada?"
            const req = mockReq({
                params: {
                    recordId: record_id,
                },
                body: {
                    question,
                }
            })
            sandbox.spy(R, 'merge');
            // Mock the getByClaim method to avoid side effects
            sandbox.stub(Story, 'create').resolves(story);

            await StoryController.create(req, res);
            expect(R.merge).to.be.have.been.calledOnce;
            expect(Story.create).to.be.have.been.calledOnceWithExactly({ question, record_id });
            expect(res.json).to.be.have.been.calledOnceWithExactly(201, story);
        });
        it('should call res.send with 204', async () => {
            const recordId = 1234;
            const storyId = 5678;
            const answer = "Al tiro se la envio."
            const req = mockReq({
                params: {
                    recordId,
                    storyId,
                },
                body: {
                    answer,
                }
            })
            // Mock the getByClaim method to avoid side effects
            sandbox.stub(Story, 'reply').resolves(true);

            await StoryController.reply(req, res);
            expect(Story.reply).to.be.have.been.calledOnceWithExactly(recordId, storyId, answer);
            expect(res.send).to.be.have.been.calledOnceWithExactly(204);
        });
    });
});