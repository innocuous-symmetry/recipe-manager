import { IGroceryList } from "../schemas";
import pool from "../db";

export class GroceryList {
    async getAll() {
        try {
            const statement = 'SELECT * FROM recipin.grocerylist';
            const result = await pool.query(statement);
            if (result.rows.length) return result.rows;
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getOne(id: string) {
        try {
            const statement = `SELECT * FROM recipin.grocerylist WHERE id = $1`
            const result = await pool.query(statement, [id]);
            if (result.rows.length) return result.rows[0];
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getByUserID(userid: string) {
        try {
            const statement = `SELECT * FROM recipin.grocerylist WHERE ownerid = $1`
            const result = await pool.query(statement, [userid]);
            if (result.rows.length) return result.rows;
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async post(data: IGroceryList) {
        try {
            // assumes that any new list will be active on creation
            const statement = `
                INSERT INTO recipin.grocerylist
                    (name, active, ownerid)
                VALUES ($1, true, $2)
                RETURNING *;
            `
            const values = [data.name, data.ownerid];
            const result = await pool.query(statement, values);
            if (result.rows.length) return result.rows[0];
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async put(id: string, data: IGroceryList) {
        try {
            const statement = `
                UPDATE recipin.grocerylist
                SET name = $1,
                    active = $2,
                    ownerid = $3
                WHERE id = $4
                RETURNING *
            `
            const values = [data.name, data.active, data.ownerid, id];

            const result = await pool.query(statement, values);
            if (result.rows.length) return result.rows[0];
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }
}