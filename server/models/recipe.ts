import { IIngredient, IRecipe, RecipeIngredient } from "../schemas";
import fs from 'fs';
import pool from "../db";
import { CollectionCtl } from "../controllers";
import now from "../util/now";
import { CtlResponse } from "../util/types";
const CollectionInstance = new CollectionCtl();

export class Recipe {
    async getOneByID(id: number) {
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

    async getAllAuthored(id: number) {
        try {
            const statement = `SELECT * FROM recipin.recipe WHERE authoruserid = $1`;
            const result = await pool.query(statement, [id]);
            if (result.rows.length) return result.rows;
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getAllAccessible(id: number) {
        try {
            const statement = `
                SELECT * FROM recipin.recipe
                WHERE authoruserid = $1
                OR authoruserid IN (
                    SELECT targetid FROM recipin.cmp_userfriendships
                    WHERE senderid = $1
                    UNION
                    SELECT senderid FROM recipin.cmp_userfriendships
                    WHERE targetid = $1
                );
            `
            const result = await pool.query(statement, [id]);
            if (result.rows.length) return result.rows;
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async fetchRecipesByCollection(collectionid: number) {
        try {
            
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async updateOneByID(id: number, data: IRecipe) {
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

    async post(userid: number, data: IRecipe) {
        const { name, description, preptime } = data;

        try {
            // create recipe itself
            const statement = `
                INSERT INTO recipin.recipe
                    (name, description, preptime, authoruserid, datecreated, datemodified)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *;
            `
            const values = [name, description, preptime, userid, now, now];
            const result = await pool.query(statement, values);
            if (!result.rows.length) return null;

            // associate recipe with default collection once created
            const collection: CtlResponse<IRecipe> = await CollectionInstance.getUserDefault(userid);
            const associateToCollection = `
                INSERT INTO recipin.cmp_recipecollection
                (recipeid, collectionid)
                VALUES ($1, $2) RETURNING *
            `

            if (typeof collection.data == 'string') {
                return null;
            }

            const associateResult = await pool.query(associateToCollection, [result.rows[0].id, collection.data.id]);
            if (!associateResult.rows.length) return null;
            
            return { recipe: result.rows[0], collection: associateResult.rows[0] }
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async addIngredientToRecipe(ingredient: RecipeIngredient, recipeid: string | number) {
        const { quantity, unit, ingredientid } = ingredient;

        try {
            const statement = `
                INSERT INTO recipin.cmp_recipeingredient
                (quantity, unit, ingredientid, recipeid)
                VALUES ($1, $2, $3, $4) RETURNING *
            `

            const result = await pool.query(statement, [quantity, unit, ingredientid, recipeid]);

            if (result.rows) return result.rows[0];
            return [];
        } catch (e: any) {
            throw new Error(e);
        }

    }
}