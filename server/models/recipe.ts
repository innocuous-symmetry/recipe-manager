import { IRecipe } from "../schemas";
import pgPromise from "pg-promise";
import pool from "../db";

const pgp = pgPromise({ capSQL: true });

export class Recipe {
    async getOneByID(id: string) {
        try {
            const statement = `SELECT * FROM recipin.recipe WHERE id = $1`;
            const values = [id];
            const result = await pool.query(statement, values);
            if (result.rows) return result.rows[0];
            return null;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getAllByUserID(id: string) {
        try {
            // to do: use setupbrowser.sql to setup the recipe browser
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async updateOneByID(id: string, data: IRecipe) {
        const { name, description, preptime } = data;
        try {
            const statement = `
                UPDATE recipin.recipe
                SET name = $1,
                    description = $2,
                    preptime = $3
                WHERE id = $4
                RETURNING *;
            `

            const result = await pool.query(statement, [name, description, preptime, id]);
            if (result.rows) return result.rows[0];
            return null;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async post(data: IRecipe) {
        const { name, description, preptime } = data;

        try {
            const statement = `INSERT INTO recipin.recipe (name, description, preptime, authoruserid) VALUES ($1, $2, $3, (SELECT id FROM recipin.appusers WHERE id = 1)) RETURNING *;`
            const values = [name, description, preptime];
            const result = await pool.query(statement, values);
            if (result.rows) return result.rows[0];
            return null;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}