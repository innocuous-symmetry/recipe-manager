import superagent from 'superagent';
import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
const APISTRING = process.env.APISTRING || 'localhost:8080';

describe('/recipe', () => {
    const server = superagent.agent();
    
    beforeAll((done) => {
        request(APISTRING).post('/auth/login')
        .send({ email: 'verifieduser@test.com', password: 'coolpassword' })
        .end((err, res) => {
            if (err) throw err;
            server.jar.setCookie(res.body.cookie);
            return done();
        })
    })

    describe('GET /', () => {
        it('gets an array of recipes', () => {
            request(APISTRING).get('/recipe')
            .withCredentials(true)
            .end((err, res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toBeDefined();
            })
        });
    });
});