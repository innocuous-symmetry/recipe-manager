import request from 'supertest';

const agent = request('localhost:8080');

export default async function loginUser(auth: { token: any }) {
    const onResponse = (err: any, res: any) => {
        if (err) throw err;
        auth.token = res.body.token;
    }

    agent.post('/auth/login')
        .send({
            email: "verifieduser@test.com",
            password: "verifieduser"
        })
        .end(onResponse);

    return auth;
}