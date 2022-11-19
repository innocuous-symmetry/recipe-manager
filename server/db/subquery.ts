import { QueryResult } from "pg";
import pool from "./";

export default function subquery(table: string, target: string, value: string | number): string {
    // const statement = `SELECT $1 FROM $2 WHERE $1 = $3`
    // const values = [target, table, value];
    // return await pool.query(statement, values);

    return '(SELECT ' + target + ' FROM ' + table + ' WHERE ' + target + ' = ' + value + ')'
}