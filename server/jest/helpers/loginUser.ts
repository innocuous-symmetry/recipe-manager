export default function loginUser(server: any) {
    server.post('/auth/login')
        .send({ email: 'verifieduser@test.com', password: 'coolpassword' })
        .end((err: any, res: Response) => {
            if (err) throw err;
            expect(res.status).toBe(200);
    })
}