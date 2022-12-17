import dotenv from 'dotenv';
import supertest from "supertest";
import loginUser from '../../helpers/loginUser';
dotenv.config();
const APISTRING = process.env.APISTRING || 'localhost:8080';
const server = supertest.agent(APISTRING);

describe('/auth', () => {
    // beforeAll(() => {
    //     loginUser(server);
    // })

    // it('receives a token', () => {
        
    // })

    // test('allows access to protected resources', async () => {
    //     const data = await supertest(APISTRING).get('/recipe');
    //     console.log(data.body);
    //     expect(data.statusCode).toBe(200);
    //     // expect(data.body.name).toBe("Green beans");
    // })
})