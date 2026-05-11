import express from "express"
import env from "dotenv"
import cors from "cors"
import pg from "pg"
import { doesNotMatch } from "node:assert";

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})

db.connect();

app.use(cors(
{   origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json())

app.get("/", async(req, res) => {
    const result = await db.query("SELECT * FROM medicine");
    const data = result.rows;
    console.log(data)
})


app.get("/api/medicine", async(req, res) => {
    const result = await db.query("SELECT * FROM medicine");
    const data = result.rows;
    res.json(data)
})

app.post("/api/medicine", async(req, res) => {
    const result = await db.query("SELECT * FROM medicine");
    const data = result.rows;
    res.json(data)
})

app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
})