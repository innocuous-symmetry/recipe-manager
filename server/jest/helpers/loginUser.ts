export default function loginUser(server: any) {
    server.post('/auth/login')
        .send({ email: 'verifieduser@test.com', password: 'coolpassword' })
        .end((err: any, res: any) => {
            if (err) throw err;
            console.log(res);
            expect(res.status).toBe(200);
    })
}