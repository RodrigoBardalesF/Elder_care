import express from "express"
import env from "dotenv"
import cors from "cors"
import pg from "pg"
import jwt from "jsonwebtoken"
import login from "./routes/login.js"
import bcrypt from "bcrypt"
import createTables  from "./db/init.js"
import db from "./db/connection.js"


const app = express();
const PORT = process.env.PORT || 3000;
env.config();

db.connect();

createTables();

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
          console.error("Error at GET /api/medicine:", error);
        res.status(500).json({error:"Error al mandar datos de medicina", error})}
})


app.get("/api/medicine", async(req, res) => {
    try {
    const result = await db.query("SELECT * FROM medicine");
    const data = result.rows;
    res.status(200).json(data)
    }   catch(error){ 
    console.error("Error at getting data from get / api/medicine")
    res.status(500).json({error:"Error at sending medicine data", error})
    }
    }
)

app.post("/api/medicine", async(req, res) => {
    try
    {const data = req.body
    console.log(data)
    const result = await db.query("INSERT INTO medicine (medicine, hour_to_take) VALUES ($1, $2) RETURNING *", [data.medicine, data.hour_to_take]);
    res.status(200).json(result.rows[0])
    } catch (error) {
    console.error("Error at posting data from post / api/medicine")
    res.status(500).json({error:"Error at posting medicine data", error})
    }
})

app.put("/api/medicine/:id", async (req, res) => {
    try {
    const data = req.body
    console.log(data);

    const {id} = req.params
    const result = await db.query("UPDATE medicine SET medicine = ($1), hour_to_take = ($2) WHERE id = ($3)", [data.medicine, data.hour_to_take, id])
    } catch (error) {
    console.error("Error at posting data from post / api/medicine")
    res.status(500).json({error:"Error at posting medicine data", error})
    }
})

app.delete("/api/medicine/:id", async(req, res) => {
    try
    {const { id } = req.params
    const result = await db.query("DELETE FROM medicine WHERE id=($1) RETURNING *", [id]);
    } catch (error) {
    console.error("Error at deleting data from delete/ api/medicine")
    res.status(500).json({error:"Error at deleting medicine data", error})
    } 
})

app.get("/api/exercise", authenticateToken,async(req, res) => {
    try
    {const result = await db.query("SELECT * FROM exercises");
    const data = result.rows;
    res.status(200).json(data)
    } catch (error) {
    console.error("Error at getting data from get / api/medicine")
    res.status(500).json({error:"Error at sending exercise data", error})
    }
})

app.post("/api/exercise", async(req, res) => {
    try
    {const data = req.body
    console.log(data)
    const result = await db.query("INSERT INTO exercises (exercise, time_sets) VALUES ($1, $2) RETURNING *", [data.exercise, data.time_sets]);
    res.status(200).json(result.rows[0])
    } catch(error){
    console.error("Error at posting data from post / api/exercise")
    res.status(500).json({error:"Error at posting exercise data", error})
    }
})

app.put("/api/exercise/:id", async (req, res) => {
    try {
    const data = req.body
    console.log(data);
    const {id} = req.params
    const result = await db.query("UPDATE exercises SET exercise = ($1), time_sets = ($2) WHERE id = ($3)", [data.exercise, data.time_sets, id])
    } catch (error) {
    console.error("Error at posting data from post / api/exercise")
    res.status(500).json({error:"Error at posting medicine data", error})
    }
})

app.delete("/api/exercise/:id", authenticateToken, async(req, res) => {
    try
    {const { id } = req.params
    const result = await db.query("DELETE FROM exercises WHERE id=($1)", [id]);
    } catch (error){
    console.error("Error at deleting data from delete/ api/exercise")
    res.status(500).json({error:"Error at deleting exercise data", error})
    }
})

app.get("/api/doctor_data", authenticateToken, async(req, res) => {
    try
    {const result = await db.query("SELECT * FROM doctors_data");
    const data = result.rows;
    res.status(200).json(data)
    } catch (error) {
    console.error("Error at getting data from get/api/doctor_data")
    res.status(500).json({error:"Error at sending doctor's data", error})
    }
})

app.post("/api/doctor_data", async(req, res) => {
    try
    {const data = req.body
    console.log(data)
    const result = await db.query("INSERT INTO doctors_data (doctor_name, doctor_contact) VALUES ($1, $2) RETURNING *", [data.doctor_name, data.doctor_contact]);
    res.status(200).json(result.rows[0])
    } catch (error) {
    console.error("Error at posting data from post / api/doctor_data")
    res.status(500).json({error:"Error at posting doctor's data", error})
    }
})

app.put("/api/doctor_data/:id", async (req, res) => {
    try {
    const data = req.body
    console.log(data);
    const {id} = req.params
    const result = await db.query("UPDATE doctors_data SET doctor_name = ($1), doctor_contact = ($2) WHERE id = ($3)", [data.doctor_name, data.doctor_contact, id])
    } catch (error) {
    console.error("Error at posting data from post / api/exercise")
    res.status(500).json({error:"Error at posting medicine data", error})
    }
})

app.delete("/api/doctor_data/:id", authenticateToken, async(req, res) => {
    try
    {const { id } = req.params
    const result = await db.query("DELETE FROM doctors_data WHERE id=($1)", [id]);
    } catch (error) {
    console.error("Error at deleting data from delete/ api/exercise")
    res.status(500).json({error:"Error at deleting docto's data", error})
    }
})

app.get("/api/notes", authenticateToken, async(req, res) => {
    try
    {const result = await db.query("SELECT * FROM notes");
    const data = result.rows;
    res.status(200).json(data)
    } catch (error){
    console.error("Error at getting data from get/api/notes")
    res.status(500).json({error:"Error at sending note's data", error})
    }
})

app.post("/api/notes", authenticateToken, async(req, res) => {
    try
    {const data = req.body
    console.log(req.user);
    console.log(data)
    const result = await db.query("INSERT INTO notes (text, date, user_id) VALUES ($1, NOW(), $2) RETURNING *", [data.text, req.user.id]);
    res.status(200).json(result.rows[0])
    } catch (error) {
    console.error("Error at posting data from post / api/notes")
    res.status(500).json({error:"Error at posting note's data", error})
    }
})


app.put("/api/notes/:id", async (req, res) => {
    try {
    const data = req.body
    console.log(data);
    const {id} = req.params
    const result = await db.query("UPDATE notes SET text = ($1) WHERE id = ($2);", [data.text, id])
    } catch (error) {
    console.error("Error at posting data from post / api/exercise")
    res.status(500).json({error:"Error at posting medicine data", error})
    }
})

app.delete("/api/notes/:id", authenticateToken, async(req, res) => {
    try 
    {const { id } = req.params
    const result = await db.query("DELETE FROM notes WHERE id=($1)", [id]);
    } catch (error) {
    console.error("Error at deleting data from delete/ api/notes")
    res.status(500).json({error:"Error at deleting notes's data", error})
    }
})

app.post("/login", async (req, res) => {
    const {username, password} = req.body    
    console.log(username);
    console.log(password);
    try {                          
        const result = await db.query("SELECT * FROM users WHERE name=($1)", [username])
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

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})

