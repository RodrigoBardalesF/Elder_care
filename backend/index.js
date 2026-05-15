import express from "express"
import env from "dotenv"
import cors from "cors"
import pg from "pg"
import { doesNotMatch } from "node:assert";
import jwt from "jsonwebtoken"
import login from "./routes/login.js"
import bcrypt from "bcrypt"

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
    try {
    const result = await db.query("SELECT * FROM medicine");
    const data = result.rows;
    console.log(data)
    } catch (error){
          console.error("Error en GET /api/medicine:", error);
        res.status(500).json({error:"Error al mandar datos de medicina, error"})}
})


app.get("/api/medicine", async(req, res) => {
    const result = await db.query("SELECT * FROM medicine");
    const data = result.rows;
    res.status(200).json(data)
})

app.post("/api/medicine", async(req, res) => {
    const data = req.body
    console.log(data)
    const result = await db.query("INSERT INTO medicine (medicine, hour_to_take) VALUES ($1, $2) RETURNING *", [data.medicine, data.hour_to_take]);
    res.status(200).json(result.rows[0])
})

app.delete("/api/medicine/:id", async(req, res) => {
    const { id } = req.params
    const result = await db.query("DELETE FROM medicine WHERE id=($1)", [id]);
})

app.get("/api/exercise", async(req, res) => {
    const result = await db.query("SELECT * FROM exercises");
    const data = result.rows;
    res.status(200).json(data)
})

app.post("/api/exercise", async(req, res) => {
    const data = req.body
    console.log(data)
    const result = await db.query("INSERT INTO exercises (exercise, time_sets) VALUES ($1, $2) RETURNING *", [data.exercise, data.time_sets]);
    res.status(200).json(result.rows[0])
})

app.delete("/api/exercise/:id", async(req, res) => {
    const { id } = req.params
    const result = await db.query("DELETE FROM exercises WHERE id=($1)", [id]);
})

app.get("/api/doctor_data", async(req, res) => {
    const result = await db.query("SELECT * FROM doctors_data");
    const data = result.rows;
    res.status(200).json(data)
})

app.post("/api/doctor_data", async(req, res) => {
    const data = req.body
    console.log(data)
    const result = await db.query("INSERT INTO doctors_data (doctor_name, doctor_contact) VALUES ($1, $2) RETURNING *", [data.doctor_name, data.doctor_contact]);
    res.status(200).json(result.rows[0])
})

app.delete("/api/doctor_data/:id", async(req, res) => {
    const { id } = req.params
    const result = await db.query("DELETE FROM doctors_data WHERE id=($1)", [id]);
})

app.get("/api/notes", async(req, res) => {
    const result = await db.query("SELECT * FROM notes");
    const data = result.rows;
    res.status(200).json(data)
})

app.post("/api/notes", async(req, res) => {
    const data = req.body
    console.log(data)
    const result = await db.query("INSERT INTO doctors_data (doctor_name, doctor_contact) VALUES ($1, $2) RETURNING *", [data.doctor_name, data.doctor_contact]);
    res.status(200).json(result.rows[0])
})

app.delete("/api/notes/:id", async(req, res) => {
    const { id } = req.params
    const result = await db.query("DELETE FROM notes WHERE id=($1)", [id]);
})

app.post("/login", async (req, res) => {
    const {user, password} = req.body.user    
    console.log(user);
    console.log(password);
    try {
        const result = await db.query("SELECT * FROM users WHERE name=($1)", [user])
        const data = result.rows[0]
        console.log("The data we receive from the DB is:", data)
            if (result.rows.length === 0) throw new Error ("Username doesn't exist") 
            const isValid = await bcrypt.compare(password, data.password)
            if (!isValid) throw new Error ("password is invalid")
            const token = jwt.sign({id: data.id}, process.env.TOKEN_SECRET, {expiresIn: '1h'})
            console.log("The token we produce and send is:", token)
            res.json({token})
    } catch (error) {res.status(401).send(error.message)}
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
            req.user = user
            next()
    })
}

app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
})