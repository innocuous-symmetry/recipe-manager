import request from 'supertest'
import { IRecipe } from '../../../schemas'

const server = request.agent('localhost:8080');

describe('/recipe', () => {
    beforeAll(async () => {
        // to do: create session user,
        // use it to log in on this test,
        // use the authenticated session to view recipes

        // await server.post('/auth/login')
        // .body()
    })

    describe('GET /', () => {
        test('gets an array of recipes', async () => {
            const result = await request('localhost:8080').get('/recipe');
            const data = JSON.parse(result.text);
            expect(data.length).toBeGreaterThan(0);
        })
    })
})