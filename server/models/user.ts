import { IUser } from "../schemas";
import fs from "fs";
import pool from '../db';
import now from "../util/now";
import { appRoot } from "../appRoot";
import { StatusCode } from "../util/types";

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

    async getOneByID(id: number | string) {
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

    async getOneByEmail(email: number | string) {
        try {
            const statement = `SELECT * FROM recipin.appusers WHERE email = $1`;
            const result = await pool.query(statement, [email]);
            if (result.rows.length) return result.rows[0];
            return null;
        } catch (e: any) {
            throw new Error(e);
            
        }
    }

    async updateOneByID(id: number | string, data: IUser) {
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

        try {
            const statement = `
                INSERT INTO recipin.appusers (
                    firstname, lastname, handle, email, password, 
                    active, isadmin, datecreated, datemodified) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING *;
            `;
            const params = [firstname, lastname, handle, email, password, active, isadmin, now, now];
            const result = await pool.query(statement, params);
            if (result.rows.length) return result.rows[0] as IUser;
            return null;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getFriends(id: number | string) {
        try {
            // const sql = fs.readFileSync(appRoot + '/db/sql/derived/friendships.sql').toString();
            const sql = `
                SELECT * FROM recipin.cmp_userfriendships
                WHERE senderid = $1;
            `
            const result = await pool.query(sql, [id]);
            if (result.rows.length) return result.rows;
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getFriendshipByID(id: number | string, userid: number | string) {
        try {
            const statement = `SELECT * FROM recipin.cmp_userfriendships WHERE id = $1`;
            const result = await pool.query(statement, [id]);

            if (result.rows.length) {
                const row = result.rows[0];
                if (row.senderid == userid || row.targetid == userid) {
                    const sql = fs.readFileSync(appRoot + '/db/sql/get/friendshipbyid.sql').toString();
                    const formattedResult = await pool.query(sql, [id]);
                    if (formattedResult.rows.length) return { ok: true, code: StatusCode.OK, result: formattedResult.rows }
                    return { ok: false, code: StatusCode.BadRequest, result: "Something went wrong" }
                }
                return { ok: true, code: StatusCode.Forbidden, result: "Not authorized to access this resource" }
            }
            
            return { ok: false, code: StatusCode.NotFound, result: "No friendship found with that ID" }
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getPendingFriendRequests(recipient: number | string) {
        try {
            const statement = `SELECT * FROM recipin.cmp_userfriendships WHERE pending = true AND targetid = $1`
            const result = await pool.query(statement, [recipient]);

            if (result.rows.length) return { ok: true, code: StatusCode.OK, result: result.rows }
            return { ok: true, code: StatusCode.NotFound, result: "No pending friend requests found" }
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getAcceptedFriends(userid: number | string) {
        try {
            const statement = `SELECT * FROM recipin.cmp_userfriendships WHERE active = true AND (senderid = $1) OR (targetid = $1);`
            const result = await pool.query(statement, [userid]);

            if (result.rows.length) return { ok: true, code: StatusCode.OK, result: result.rows }
            return { ok: true, code: StatusCode.NotFound, result: "No pending friend requests found" }
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async addFriendship(userid: number | string, targetid: number | string) {
        try {
            const statement = `
                INSERT INTO recipin.cmp_userfriendships
                (datecreated, active, pending, senderid, targetid)
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

    async updateFriendship(id: number | string, userid: number | string, data: { active: boolean, pending: boolean, dateterminated?: string }) {
        try {
            const query = `SELECT * FROM recipin.cmp_userfriendships WHERE id = $1`;
            const friendship = await pool.query(query, [id]);
            if (!friendship.rows.length) return { ok: false, code: StatusCode.NotFound, result: "Friendship with this code not found" };
            if (!(friendship.rows[0].active) && friendship.rows[0].senderid == userid) {
                return { ok: false, code: StatusCode.Forbidden, result: "Please wait for friend request to be accepted" }
            }

            const statement = `
                UPDATE recipin.cmp_userfriendships
                SET active = $1,
                    pending = $2,
                    dateterminated = $3
                WHERE id = $4
                RETURNING *;
            `
            const values = [data.active, data.pending, (data.dateterminated || null), id];
            const result = await pool.query(statement, values);
            if (result.rows.length) return { ok: true, code: StatusCode.OK, result: result.rows[0] }
            return { ok: false, code: StatusCode.BadRequest, result: "Bad request" }
        } catch (e: any) {
            throw new Error(e);
        }
    }
}