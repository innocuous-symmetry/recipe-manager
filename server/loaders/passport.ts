import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import { Express } from "express";
import AuthService from "../auth";
import { IUserAuth } from "../schemas";
const AuthInstance = new AuthService();

export const passportLoader = async (app: Express) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    })

    passport.deserializeUser((user: IUserAuth, done) => {
        done(null, user);
    })

    // sign in method with passport local strategy
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const response = await AuthInstance.login({ email, password });
            return done(null, response);
        } catch (e: any) {
            return done(e);
        }
    }))

    return passport;
}