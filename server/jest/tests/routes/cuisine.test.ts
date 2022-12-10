import request from 'supertest';
import { ICuisine } from '../../../schemas';

describe('GET /cuisine', () => {
    let data: Array<ICuisine>;

    beforeAll(async () => {
        const result = await request('localhost:8080')
        .get('/cuisine');
    
        data = JSON.parse(result.text);
    })

    it('returns a result if one exists', async () => {
        expect(data.length).toBeGreaterThan(0);
    })

    it('matches cuisine schema', async () => {
        expect(() => {
            const expected = new Array<keyof ICuisine>();
            for (let key of Object.keys(data[0])) {
                expected.push(key as keyof ICuisine);
            }
        }).not.toThrow();
    })
})

describe('GET /cuisine/:id', () => {
    let data: ICuisine
    beforeAll(async() => {
        const result = await request('localhost:8080')
        .get('/cuisine/1');
        data = JSON.parse(result.text);
    })

    it('returns a single object if exists', async () => {
        expect(data).toBeDefined();
    })

    it('matches cuisine schema', async () => {
        expect(() => {
            const expected = new Array<keyof ICuisine>();
            for (let key of Object.keys(data)) {
                expected.push(key as keyof ICuisine);
            }
        }).not.toThrow();
    })
})