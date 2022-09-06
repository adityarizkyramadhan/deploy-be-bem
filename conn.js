require("dotenv").config();

const env = process.env
const { Client } = require('pg')
const conn = new Client({
	user: env.SUPABASE_USER,
	host: env.SUPABASE_HOST,
	database: env.SUPABASE_DB_NAME,
	password: env.SUPABASE_PASSWORD,
	port: 5432,
})

conn.connect()

conn.query("CREATE TABLE IF NOT EXISTS TODOS (ID SERIAL PRIMARY KEY, TODO TEXT NOT NULL)")



module.exports = conn;
