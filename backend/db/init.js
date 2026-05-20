import db from "./connection.js";

const createTables = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL 
            )`)
        
        await db.query(`
            CREATE TABLE IF NOT EXISTS doctor_data (
            id SERIAL PRIMARY KEY,
            doctor_name VARCHAR(255) NOT NULL,
            doctor_contact VARCHAR(255) NOT NULL
            )`)

        await db.query(`
            CREATE TABLE IF NOT EXISTS medicine (
            id SERIAL PRIMARY KEY,
            medicine VARCHAR(255) NOT NULL,
            hour_to_take VARCHAR(255) NOT NULL
             )`)

        await db.query(`
            CREATE TABLE IF NOT EXISTS exercises (
            id SERIAL PRIMARY KEY,
            exercise VARCHAR(255) NOT NULL,
            time_sets VARCHAR(255) NOT NULL
             )`)
             
        await db.query(`
            CREATE TABLE IF NOT EXISTS notes (
            id SERIAL PRIMARY KEY,
            text VARCHAR(255) NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
             )`)


        } catch (error) {
            console.error("Error at creating tables", error)
        };
    }

export default createTables;