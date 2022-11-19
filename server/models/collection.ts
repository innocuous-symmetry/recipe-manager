import { ICollection } from "../schemas";
import pool from "../db";

export class Collection {
    async getOne(id: string) {
        try {
            const statement = `SELECT * FROM recipin.collection WHERE id = $1`;
            const values = [id];
            const result = await pool.query(statement, values);
            if (result.rows.length) return result.rows[0];
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getAll() {
        // requires clearance
        try {
            const statement = `SELECT * FROM recipin.collection`;
            const result = await pool.query(statement);
            if (result.rows.length) return result.rows;
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async post(data: ICollection) {
        const { name, active, ismaincollection, ownerid } = data;
        try {
            const statement = `
                INSERT INTO recipin.collection
                    (name, active, ismaincollection, ownerid)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `
            const values = [name, active, ismaincollection, ownerid];
            const result = await pool.query(statement, values);
            if (result.rows.length) return result.rows;
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }
}