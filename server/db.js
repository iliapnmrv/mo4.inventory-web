import mysql from 'mysql2'

const pool = new mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'inventory'
}).promise();

export default pool

// Postgres connection
// import pg from 'pg'

// const pool = new pg.Pool({
//     user: "postgres",
//     password: "1234",
//     host: "localhost",
//     port: 5432,
//     database: "inventory"
// })

// export default pool