import pool from "../db";
import now from "../util/now";
import { ICuisine } from "../schemas";

export default class Cuisine {
    async getOne(id: string) {
        try {
            const statement = `SELECT * FROM recipin.cuisine WHERE id = $1`;
            const values = [id];
            const result = await pool.query(statement, values);
            if (result.rows) return result.rows[0];
            return null;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getAll() {
        try {
            const statement = `SELECT * FROM recipin.cuisine`;
            const result = await pool.query(statement);
            if (result.rows.length) return result.rows;
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async post(data: ICuisine) {
        try {
            const { name } = data;
            const statement = `
            INSERT INTO recipin.cuisine
                (name, datecreated, datemodified, active)
            VALUES ($1, $2, $3, $4) RETURNING *`;
            const values = [name, now, now, true];
            const result = await pool.query(statement, values);
            if (result.rows.length) return result.rows[0];
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }
}