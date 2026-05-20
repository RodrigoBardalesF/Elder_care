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
        
        await db.query(`
            INSERT INTO users (name, lastname, password) 
            VALUES 
            ('Rodrigo', 'Favela', '$2a$12$DCuOk83./bZV5QnUXnBSW.APK8Gm025wQ9UDNc0XceqzwzKrVmu/2'), 
            ('Julia', 'Bardales', '$2a$12$DCuOk83./bZV5QnUXnBSW.APK8Gm025wQ9UDNc0XceqzwzKrVmu/2'),
            ('Veronica', 'Bardales', '$2a$12$DCuOk83./bZV5QnUXnBSW.APK8Gm025wQ9UDNc0XceqzwzKrVmu/2'),
            ('Luis', 'Favela', '$2a$12$DCuOk83./bZV5QnUXnBSW.APK8Gm025wQ9UDNc0XceqzwzKrVmu/2');
            `)
        
        await db.query(`
            INSERT INTO doctors_data (doctor_name, doctor_contact) 
            VALUES 
            ('Roberto Quiroz', '555-1234'), 
            ('Claudia Espinoza', '555-5678');
            `)
        
        await db.query(`
            INSERT INTO medicine (medicine, hour_to_take) 
            VALUES 
            ('Treda', '100 gr a las 2:00 pm'), 
            ('Ibuprofeno', '100 mg 12:00 pm');
            `)

        await db.query(`
            INSERT INTO exercises (exercise, time_sets) 
            VALUES 
            ('Caminar', '10 minutos'), 
            ('Sentadillas', '20 minutes);
            `)

        } catch (error) {
            console.error("Error at creating tables", error)
        };
    }

export default createTables;