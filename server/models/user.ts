import { IUser } from "../schemas";
import { sql } from "@databases/pg";
import pgPromise from "pg-promise";
import db from "../db";

const pgp = pgPromise({ capSQL: true });
export class User {
    async getAllUsers() {
        // behind auth
        try {
            const statement = sql`SELECT * FROM recipe`
            const result = await db.query(statement);

            console.log(result);
            await db.dispose();
            return result;
        } catch (error) {
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