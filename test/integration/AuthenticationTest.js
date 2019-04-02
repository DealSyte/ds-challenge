/* eslint no-undef:0 */
import chai, { expect } from 'chai';
import supertest from 'supertest';
import app from '../../server';
import user from './fixtures/userCredentials';

let server;
let request;
const credentials = user.admin;

const basePath = '/api/v1/auth'

before(async () => {
    try {
        server = await app;
        request = supertest(server);
    } catch (e) {
        winston.error(e);
    }
});

after(() => {
    server.close();
});
describe('Authentication Workflow test', () => {

    it('Should return an accesstoken if valid credentials are provided', async () => {
        const { body } = await request
            .post(basePath)
            .send(credentials)
            .expect(200);
        expect(body).to.have.property('accessToken')
    });
    it('Should get 401 when invalid credentials are provided', async () => {
        const creden = { ...credentials };
        creden.password = 'invalidpasssword'
        const { body } = await request
            .post(basePath)
            .send(creden)
            .expect(401);
    });
});