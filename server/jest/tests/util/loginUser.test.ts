import supertest from "supertest";
import loginUser from '../../helpers/loginUser';
import dotenv from 'dotenv';
dotenv.config();
const APISTRING = process.env.APISTRING || 'localhost:8080';
const server = supertest.agent(APISTRING);

describe('login user', () => {
    beforeAll(() => {
        server.post('/auth/login')
            .send({ email: 'verifieduser@test.com', password: 'coolpassword' })
            .end((err, res) => {
                console.log(res);
                if (err) throw err;
                expect(res.status).toBe(200);
            }
        )
    })

    it('allows access to protected resources', () => {
        server.get('/recipe').end((err, res) => {
            if (err) throw err;
            expect(res.statusCode).toBe(200);
        })
    })
})