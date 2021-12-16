import mysql from 'mysql2'

const pool = new mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'inventory'
}).promise();

export default pool