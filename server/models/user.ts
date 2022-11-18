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
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async post(data: IUser) {
        const { firstname, lastname, handle, email, password } = data;
        try {
            const statement = `INSERT INTO recipin.appusers (firstname, lastname, handle, email, password) VALUES ($1, $2, $3, $4, $5)`;
            const params = [firstname, lastname, handle, email, password];
            const result = await pool.query(statement, params);
            if (result.rows.length) return result.rows;
            return null;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    // async getOneByID(id: string): Promise<Array<IUser | null>> {
    //     try {
    //         const statement = `SELECT * FROM users WHERE id = $1;`;
    //         const values = [id];
    //         const result = await db.query(statement, values);
    //         if (result.rows.length) return result.rows[0];
    //         return [];
    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // }

    // async updateOneByID(id: string, data: IUser): Promise<IUser | null> {
    //     try {
    //         // does this formatting work?
    //         const condition = pgp.as.format('WHERE id = $1 RETURNING *', id);
    //         const statement = pgp.helpers.update(data, null, 'users') + condition;
    //         const result = await db.query(statement);
    //         if (result.rows.length) return result.rows[0];
    //         return null;
    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // }
}