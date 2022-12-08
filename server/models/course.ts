import now from "../util/now";
import pool from "../db";
import { ICourse } from "../schemas";

export default class Course {
    async getOne(id: string) {
        try {
            const statement = `SELECT * FROM recipin.course WHERE id = $1`;
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
            const statement = `SELECT * FROM recipin.course`;
            const result = await pool.query(statement);
            if (result.rows.length) return result.rows;
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async post(data: ICourse) {
        try {
            const { name } = data;
            const statement = `
            INSERT INTO recipin.course
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