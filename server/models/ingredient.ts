import { IIngredient } from "../schemas";
import pool from "../db";

export class Ingredient {
    async getAll() {
        try {
            const statement = `SELECT * FROM recipin.ingredient`;
            const result = await pool.query(statement);
            if (result.rows.length) return result.rows;
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getOne(id: string) {
        try {
            const statement = `SELECT * FROM recipin.ingredient WHERE id = $1`;
            const result = await pool.query(statement, [id]);
            if (result.rows.length) return result.rows[0];
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async post(data: IIngredient) {
        try {
            const statement = `
            INSERT INTO recipin.ingredient
                (name, description)
            VALUES ($1, $2) RETURNING *`;
            const values = [data.name, data.description];
            const result = await pool.query(statement, values);
            if (result.rows.length) return result.rows[0];
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async put(id: string, data: IIngredient) {
        try {
            const statement = `
            UPDATE recipin.ingredient
            SET name = $1,
                description = $2
            WHERE id = $3
            RETURNING *
            `
    
            const values = [data.name, data.description, id];
            const result = await pool.query(statement, values);
            if (result.rows.length) return result.rows[0];
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }
}