import AuthService from "../../../auth";
import request from 'supertest';
import randomEmail from "../../helpers/randomEmail";
import randomHandle from "../../helpers/randomHandle";
import { IUser, IUserAuth } from "../../../schemas";

const server = request.agent('localhost:8080');
const myAccount = {
}

describe('class AuthService', () => {
    let mockUser: IUser;
    beforeEach(() => {
        mockUser = {
            firstname: "mock",
            lastname: "user",
            email: randomEmail(),
            password: 'testpassword',
            handle: randomHandle(),
            isadmin: false
        }
    })

    // save user data from successful registration attempt
    let extantUser: IUser | undefined;

    describe('register', () => {
        test('register', () => {
            extantUser = mockUser;

            server
                .post('/auth/register')
                .send(mockUser)
                .set('accept', 'application/json')
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).toEqual(200);
                    expect(res.body.ok).toBe(true);
                })
        })
    })

    describe('login', () => {
        test('extant user can log in', () => {
            server.post('/auth/login')
                .send(extantUser)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).toEqual(200);
                    expect(res.body.ok).toEqual(true);
                    expect(res.body.user.email).toEqual(extantUser!.email);
                })
        })

        test('cannot login with incorrect credientials', () => {
            server.post('/auth/login')
                .send(mockUser)
                .end((err, res) => {
                    expect(res.status).toEqual(401);
                })
        })

        test('cannot login if no matching account exists', () => {

        })
    })



    /*
    test('google register', () => {

    })

    test('google login', () => {
        
    })
    */
})