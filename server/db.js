import mysql from 'mysql2'

const pool = new mysql.createPool({
    host: 'mo4-web',
    user: 'inventuser',
    password: '8o6a3O4A5eLA',
    database: 'inventory'
}).promise();

export default pool