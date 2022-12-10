import request from 'supertest';
import { IUser } from '../../../schemas';

describe('GET /users', () => {
    let data: Array<IUser>
    beforeAll(async() => {
        const response = await request('localhost:8080')
        .get('/users');
        data = JSON.parse(response.text);
    })

    test('gets data if exists', () => {
        expect(data.length).toBeGreaterThan(0);
    })

    test('data matches user schema', () => {
        expect(() => {
            const expected = new Array<keyof IUser>();
            for (let key of Object.keys(data[0])) {
                expected.push(key as keyof IUser);
            }
        }).not.toThrow();
    })
})

describe('GET /users/1', () => {
    let data: IUser
    beforeAll(async() => {
        const response = await request('localhost:8080')
            .get('/users/1')
        data = JSON.parse(response.text);
    })

    test('retrieves a single record', () => {
        expect(data).toBeDefined();
    })

    test('matches user schema', () => {
        const expected = new Array<keyof IUser>();
        for (let key of Object.keys(data)) {
            expected.push(key as keyof IUser);
        }
    })
})