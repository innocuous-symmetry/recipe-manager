import loginUser from "../../helpers/loginUser"

describe('login user', () => {
    let auth = { token: undefined }
    beforeAll(async () => {
        auth = await loginUser(auth);
    })

    it('authenticates a hard-coded user', () => {
        console.log(auth);
        expect(auth.token).toBeDefined();
    })
})