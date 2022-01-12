import mysql from 'mysql2'

// const pool = new mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '1234',
//     database: 'inventory'
// }).promise();

const pool = new mysql.createConnection({
    host: 'mo4-web',
    user: 'inventuser',
    password: '8o6a3O4A5eLA',
    database: 'inventory'
}).promise();

export default pool