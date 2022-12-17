import supertest from 'supertest'
import loginUser from '../../helpers/loginUser';
import { IRecipe } from '../../../schemas'
import dotenv from 'dotenv';
import app from '../../..';
dotenv.config();
const APISTRING = process.env.APISTRING || 'localhost:8080';
const server = supertest.agent(app);

describe('/recipe', () => {
    beforeAll(() => {
        server.post('/auth/login')
        .send({ email: 'verifieduser@test.com', password: 'coolpassword' });
    })

    describe('GET /', () => {
        it('gets an array of recipes', () => {
            server.get('/recipe').end((err, res) => {
                if (err) throw err;
                console.log(res.body);
                expect(res.statusCode).toBe(200);
                expect(res.body.ok).toBeTruthy();
            });

        });
    });
});