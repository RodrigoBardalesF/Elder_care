import {Client} from "pg"
import env from "dotenv"
env.config();

const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? {rejectUnauthorized: false } : false
});

export default db;