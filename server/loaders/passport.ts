import passport from "passport";
import { Express } from "express";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

export const passportLoader = async (app: Express) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user: Express.User, done) => {
        process.nextTick(() => {
            done(null, user);
        })
    })

    passport.deserializeUser((user: Express.User, done) => {
        process.nextTick(() => {
            done(null, user);
        })
    })

    // config for jwt strategy
    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secret'
    }

    // jwt strategy
    passport.use(new JwtStrategy(opts, async (token, done) => {
        try {
            return done(null, token.user);
        } catch (error) {
            done(error);
        }
    }))

    return passport;
}