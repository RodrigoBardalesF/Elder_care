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
    const data = req.body
    console.log(data)
    const result = await db.query("INSERT INTO medicine (medicine, hour_to_take) VALUES ($1, $2) RETURNING *", [data.medicine, data.hour_to_take]);
    res.json(result.rows[0])
})

app.delete("/api/medicine/:id", async(req, res) => {
    const { id } = req.params
    const result = await db.query("DELETE FROM medicine WHERE id=($1)", [id]);
})

app.get("/api/exercise", async(req, res) => {
    const result = await db.query("SELECT * FROM exercises");
    const data = result.rows;
    res.json(data)
})

app.post("/api/exercise", async(req, res) => {
    const data = req.body
    console.log(data)
    const result = await db.query("INSERT INTO exercises (exercise, time_sets) VALUES ($1, $2) RETURNING *", [data.exercise, data.time_sets]);
    res.json(result.rows[0])
})

app.delete("/api/exercise/:id", async(req, res) => {
    const { id } = req.params
    const result = await db.query("DELETE FROM exercises WHERE id=($1)", [id]);
})

app.get("/api/doctor_data", async(req, res) => {
    const result = await db.query("SELECT * FROM doctors_data");
    const data = result.rows;
    res.json(data)
})

app.post("/api/doctor_data", async(req, res) => {
    const data = req.body
    console.log(data)
    const result = await db.query("INSERT INTO doctors_data (doctor_name, doctor_contact) VALUES ($1, $2) RETURNING *", [data.doctor_name, data.doctor_contact]);
    res.json(result.rows[0])
})

app.delete("/api/doctor_data/:id", async(req, res) => {
    const { id } = req.params
    const result = await db.query("DELETE FROM doctors_data WHERE id=($1)", [id]);
})

app.get("/api/notes", async(req, res) => {
    const result = await db.query("SELECT * FROM notes");
    const data = result.rows;
    res.json(data)
})

app.post("/api/notes", async(req, res) => {
    const data = req.body
    console.log(data)
    const result = await db.query("INSERT INTO doctors_data (doctor_name, doctor_contact) VALUES ($1, $2) RETURNING *", [data.doctor_name, data.doctor_contact]);
    res.json(result.rows[0])
})

app.delete("/api/notes/:id", async(req, res) => {
    const { id } = req.params
    const result = await db.query("DELETE FROM notes WHERE id=($1)", [id]);
})

app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
})