import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import { Express } from "express";
import AuthService from "../auth";
import { IUserAuth } from "../schemas";
const AuthInstance = new AuthService();

export const passportApp = (app: Express) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    })

    passport.deserializeUser((user: IUserAuth, done) => {
        process.nextTick(async () => {
            const userData = await AuthInstance.login(user);
            return userData ? done(null, userData) : done(null, false);
        })
    })

    // sign in method with passport local strategy
    passport.use(new LocalStrategy(async (email, password, done) => {
        try {
            const response = await AuthInstance.login({ email, password });
            return done(null, response);
        } catch (e: any) {
            return done(e);
        }
    }))

    return passport;
}