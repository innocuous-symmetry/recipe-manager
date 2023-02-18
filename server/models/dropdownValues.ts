import pool from "../db";

export default class Dropdown {
    async getMeasurements() {
        try {
            const statement = `SELECT * FROM recipin.dropdownVals WHERE datatype = 'MEASUREMENTS'`;
            const result = await pool.query(statement);
            if (result.rows.length) return result.rows;
            return null;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getCourses() {
        try {
            const statement = `SELECT * FROM recipin.dropdownVals WHERE datatype = 'COURSE'`;
            const result = await pool.query(statement);
            if (result.rows.length) return result.rows;
            return null;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}