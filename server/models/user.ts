import { IUser } from "../schemas";
import fs from "fs";
import pgPromise from "pg-promise";
import pool from '../db';
import now from "../util/now";
import { appRoot } from "../appRoot";

const pgp = pgPromise({ capSQL: true });
export class User {
    async getAllUsers() {
        // behind auth
        try {
            const statement = `SELECT * FROM recipin.appusers`;
            const result = await pool.query(statement);
            if (result.rows.length) return result.rows;
            return null;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getOneByID(id: string) {
        try {
            const statement = `SELECT * FROM recipin.appusers WHERE id = $1`;
            const values = [id];
            const result = await pool.query(statement, values);
            if (result.rows.length) return result.rows[0];
            return null;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getOneByEmail(email: string) {
        try {
            const statement = `SELECT * FROM recipin.appusers WHERE email = $1`;
            const result = await pool.query(statement, [email]);
            if (result.rows.length) return result.rows[0];
            return null;
        } catch (e: any) {
            throw new Error(e);
            
        }
    }

    async updateOneByID(id: string, data: IUser) {
        try {
            const statement = `
                UPDATE recipin.appusers
                SET firstname = $1,
                    lastname = $2,
                    handle = $3,
                    email = $4,
                    password = $5,
                    active = $6,
                    datemodified = $7
                WHERE id = $8
                RETURNING *;
            `
            const values = [
                data.firstname, data.lastname, data.handle,
                data.email, data.password, data.active,
                data.datemodified, id
            ]

            const result = await pool.query(statement, values);
            if (result.rows.length) return result.rows[0];
            return null;
        } catch (error: any) {
            throw new Error(error);
        }
    }


    async post(data: IUser) {
        const { firstname, lastname, handle, email, password, active, isadmin } = data;
        const datecreated = now;
        const datemodified = now;

        try {
            const statement = `
                INSERT INTO recipin.appusers (
                    firstname, lastname, handle, email, password, 
                    active, isadmin, datecreated, datemodified) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING *;
            `;
            const params = [firstname, lastname, handle, email, password, active, isadmin, datecreated, datemodified];
            const result = await pool.query(statement, params);
            if (result.rows.length) return result.rows;
            return null;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getFriends(id: string) {
        try {
            const sql = fs.readFileSync(appRoot + '/db/sql/derived/friendships.sql').toString();
            const result = await pool.query(sql, [id]);
            if (result.rows.length) return result.rows;
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }
}