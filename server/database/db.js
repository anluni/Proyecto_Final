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

module.exports = pool;