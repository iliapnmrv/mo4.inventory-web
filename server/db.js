import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

console.log(process.env.DB_HOST);


const pool = new mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).promise();

export default pool