import createConnectionPool, { sql } from "@databases/pg";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const db = createConnectionPool(process.env.CONSTRING);

export { sql };
export default db;
