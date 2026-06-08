const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

const getHealth = async () => {
  try {
    const result = await pool.query("SELECT NOW()");

    console.log(
      "✅ Base de datos conectada y funcionando a las " +
        result.rows[0].now
    );

  } catch (error) {
    console.error(
      "❌ Error conectando a la base de datos: " +
        error.message
    );
  }
};

getHealth();

pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT
  );

  CREATE TABLE IF NOT EXISTS item (
    id SERIAL PRIMARY KEY,
    name TEXT,
    price INTEGER,
    image TEXT
  );
`)
.then(() => console.log("✅ Tablas creadas"))
.catch(err => console.error(err));

module.exports = pool;