import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';
import pool from ".";

export default function pgSessionStore(s: typeof session) {
    const pgSession = connectPgSimple(s);

    return new pgSession({
        pool: pool,
        tableName: "pgsessions",
        createTableIfMissing: true
    })
}