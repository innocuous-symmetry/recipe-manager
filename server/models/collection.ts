import { ICollection } from "../schemas";
import pool from "../db";

export class Collection {
    async getOne(id: string) {
        try {
            const statement = `SELECT * FROM recipin.collection WHERE id = $1`;
            const values = [id];
            const result = await pool.query(statement, values);
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getAll() {
        // requires clearance
        try {
            const statement = `SELECT * FROM recipin.collection`;
            const result = await pool.query(statement);
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async post(data: ICollection) {
        try {
            const statement = `
                INSERT INTO recipin.collection
                ()
            `
        } catch (e: any) {
            throw new Error(e);
        }
    }
}