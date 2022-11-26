import { IUser } from "../schemas";
import fs from "fs";
import pool from '../db';
import now from "../util/now";
import { appRoot } from "../appRoot";

export class User {
    async getAllUsers() {
        // behind auth
        try {
            const statement = `SELECT * FROM recipin.appusers`;
            const result = await pool.query(statement);
            if (result.rows.length) return result.rows;
            return null;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getOneByID(id: string) {
        try {
            const statement = `SELECT * FROM recipin.appusers WHERE id = $1`;
            const values = [id];
            const result = await pool.query(statement, values);
            if (result.rows.length) return result.rows[0];
            return null;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getOneByEmail(email: string) {
        try {
            const statement = `SELECT * FROM recipin.appusers WHERE email = $1`;
            const result = await pool.query(statement, [email]);
            if (result.rows.length) return result.rows[0];
            return null;
        } catch (e: any) {
            throw new Error(e);
            
        }
    }

    async updateOneByID(id: string, data: IUser) {
        try {
            const statement = `
                UPDATE recipin.appusers
                SET firstname = $1,
                    lastname = $2,
                    handle = $3,
                    email = $4,
                    password = $5,
                    active = $6,
                    datemodified = $7
                WHERE id = $8
                RETURNING *;
            `
            const values = [
                data.firstname, data.lastname, data.handle,
                data.email, data.password, data.active,
                data.datemodified, id
            ]

            const result = await pool.query(statement, values);
            if (result.rows.length) return result.rows[0];
            return null;
        } catch (error: any) {
            throw new Error(error);
        }
    }


    async post(data: IUser) {
        const { firstname, lastname, handle, email, password, active, isadmin } = data;
        const datecreated = now;
        const datemodified = now;

        try {
            const statement = `
                INSERT INTO recipin.appusers (
                    firstname, lastname, handle, email, password, 
                    active, isadmin, datecreated, datemodified) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING *;
            `;
            const params = [firstname, lastname, handle, email, password, active, isadmin, datecreated, datemodified];
            const result = await pool.query(statement, params);
            if (result.rows.length) return result.rows;
            return null;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getFriends(id: string) {
        try {
            const sql = fs.readFileSync(appRoot + '/db/sql/derived/friendships.sql').toString();
            const result = await pool.query(sql, [id]);
            if (result.rows.length) return result.rows;
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getFriendshipByID(id: string, userid: string) {
        try {
            const statement = `SELECT * FROM recipin.cmp_userfriendships WHERE id = $1`;
            const result = await pool.query(statement, [id]);

            if (result.rows.length) {
                const row = result.rows[0];
                if (row.firstuserid == userid || row.seconduserid == userid) {
                    const sql = fs.readFileSync(appRoot + '/db/sql/get/friendshipbyid.sql').toString();
                    const formattedResult = await pool.query(sql, [id]);
                    if (formattedResult.rows.length) return { ok: true, code: 200, result: formattedResult.rows }
                    return { ok: false, code: 400, result: "Something went wrong" }
                }
                return { ok: true, code: 403, result: "Not authorized to access this resource" }
            }
            
            return { ok: false, code: 404, result: "No friendship found with that ID" }
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async addFriendship(userid: string, targetid: string) {
        try {
            const statement = `
                INSERT INTO recipin.cmp_userfriendships
                (datecreated, active, pending, firstuserid, seconduserid)
                VALUES ($1, false, true, $2, $3)
                RETURNING *;
            `
            const values = [now, userid, targetid];
            const result = await pool.query(statement, values);
            if (result.rows.length) {
                return result.rows[0];
            }
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async updateFriendship(id: string, data: { active: boolean, pending: boolean, dateterminated?: string }) {
        try {
            const statement = `
                UPDATE recipin.cmp_userfriendships
                SET active = $1,
                    pending = $2,
                    dateterminated = $3
                WHERE id = $4
                RETURNING *;
            `
            const values = [data.active, data.pending, data.dateterminated || null, id];
            const result = await pool.query(statement, values);
            if (result.rows.length) return result.rows[0];
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }
}