import pg from 'pg'

const pool = new pg.Pool({
    user: "postgres",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "inventory"
})

export default pool