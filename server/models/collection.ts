import { ICollection, IUser } from "../schemas";
import { User } from "./user";
import { appRoot } from "../appRoot";
import now from "../util/now";
import pool from "../db";
import fs from 'fs';
const UserInstance = new User();
export class Collection {
    async getOne(id: number | string) {
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

    async getUserDefault(id: number | string) {
        try {
            const statement = `
                SELECT * FROM recipin.collection
                WHERE ownerid = $1
                AND ismaincollection = true;
            `
            const result = await pool.query(statement, [id]);
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
        console.log('new default collection');
        console.log(data);
        const { name, active, ismaincollection, ownerid } = data;
        try {
            const statement = `
                INSERT INTO recipin.collection
                    (name, active, ismaincollection, ownerid, datecreated, datemodified)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *;
            `
            const values = [name, (active || true), (ismaincollection || false), ownerid, now, now];
            const result = await pool.query(statement, values);
            if (result.rows.length) return result.rows;
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getSubscriptions(userid: number | string) {
        try {
            const sql = fs.readFileSync(appRoot + '/db/sql/get/getsubscriptions.sql').toString();
            console.log(sql);
            const result = await pool.query(sql, [userid]);
            if (result.rows.length) return result.rows;
            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async postSubscription(collectionid: number | string, userid: number | string): Promise<{ ok: boolean, code: number, data: number | string | any[] }> {
        try {
            // ensure user exists
            const user: IUser | null = await UserInstance.getOneByID(userid);
            if (!user) {
                return {
                    ok: false,
                    code: 404,
                    data: "User not found"
                }
            }

            // ensure collection exists
            const target: ICollection | null = await this.getOne(collectionid);
            if (!target) {
                return {
                    ok: false,
                    code: 404,
                    data: "Collection not found"
                }
            }

            // ensure a user cannot subscribe to their own collection
            let typedUserID: number = (userid == typeof 'string') ? parseInt(userid) : userid as number;
            if (target.ownerid == typedUserID) {
                return {
                    ok: false,
                    code: 403,
                    data: "User cannot subscribe to their own collection"
                }
            }

            // ensure a duplicate subscription does not exist
            const allSubscriptions = `
                SELECT * FROM recipin.cmp_usersubscriptions
                WHERE collectionid = $1;
            `
            const subscriptionResult = await pool.query(allSubscriptions, [collectionid]);
            if (subscriptionResult.rows?.length) {
                for (let row of subscriptionResult.rows) {
                    if (row.usermemberid == typedUserID) {
                        return {
                            ok: false,
                            code: 403,
                            data: "This user is already subscribed"
                        }
                    } 
                }
            }

            // finally, execute insertion
            const statement = `
                INSERT INTO recipin.cmp_usersubscriptions
                    (collectionid, usermemberid, active)
                VALUES ($1, $2, true)
                RETURNING *;
            `

            const result = await pool.query(statement, [collectionid, userid]);
            if (result.rows.length) {
                return {
                    ok: true,
                    code: 201,
                    data: result.rows
                }
            }

            return {
                ok: false,
                code: 400,
                data: "Bad request. No data returned."
            }
        } catch (e: any) {
            throw new Error(e);
        }
    }
}