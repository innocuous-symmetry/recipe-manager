import { IUser } from "../schemas";
import pgPromise from "pg-promise";
import pool from '../db';

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

    async updateOneByID(id: string, data: IUser) {
        try {
            const statement = `
                UPDATE recipin.appusers
                SET firstname = $1,
                    lastname = $2,
                    handle = $3,
                    email = $4,
                    password = $5,
                    active = $6
                WHERE id = $7
                RETURNING *;
            `
            const values = [
                data.firstname, data.lastname, data.handle,
                data.email, data.password, data.active, id
            ]

            const result = await pool.query(statement, values);
            if (result.rows.length) return result.rows[0];
            return null;
        } catch (error: any) {
            throw new Error(error);
        }
    }


    async post(data: IUser) {
        const { firstname, lastname, handle, email, password, active } = data;
        try {
            const statement = `INSERT INTO recipin.appusers (firstname, lastname, handle, email, password, active) VALUES ($1, $2, $3, $4, $5, $6)`;
            const params = [firstname, lastname, handle, email, password, active];
            const result = await pool.query(statement, params);
            if (result.rows.length) return result.rows;
            return null;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}