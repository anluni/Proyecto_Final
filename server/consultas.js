const pool = require("./database/db");
const format = require("pg-format");
const bcrypt = require("bcryptjs");

// LOGIN - verificar credenciales
const verificarCredenciales = async (email, password) => {
  const consulta = "SELECT * FROM users WHERE email = $1";
  const values = [email];

  const result = await pool.query(consulta, values);

  console.log("📌 Email ingresado:", email);

  if (!result.rowCount) {
    throw {
      code: 404,
      message: "Usuario no encontrado",
    };
  }

  const user = result.rows[0];

  // comparar password normal con hash guardado
  const isMatch = await bcrypt.compare(password, user.password);

  console.log("✅ Resultado bcrypt.compare:", isMatch);

  if (!isMatch) {
    throw {
      code: 401,
      message: "Contraseña incorrecta",
    };
  }

  return user;
};

// GET ITEMS
const getItems = async ({
  limit = 3,
  order_by = "id_ASC",
  page = 0,
}) => {
  try {
    const [nombre, orden] = order_by.split("_");

    let offset = Number(page) * Number(limit);

    const formattedQuery = format(
      "SELECT * FROM item ORDER BY %s %s LIMIT %s OFFSET %s",
      nombre,
      orden,
      limit,
      offset
    );

    const result = await pool.query(formattedQuery);

    const resultTotal = await pool.query(
      "SELECT * FROM item"
    );

    const hateoas = result.rows.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      url: `${process.env.URL_BACKEND || "http://localhost:3000"}/items/${item.id}`,
    }));

    return {
      count: resultTotal.rowCount,

      previous_page:
        page > 0
          ? `${process.env.URL_BACKEND || "http://localhost:3000"}/items?limit=${limit}&order_by=${order_by}&page=${
              Number(page) - 1
            }`
          : null,

      next_page:
        Number(offset) + Number(limit) <
        Number(resultTotal.rowCount)
          ? `${process.env.URL_BACKEND || "http://localhost:3000"}/items?limit=${limit}&order_by=${order_by}&page=${
              Number(page) + 1
            }`
          : null,

      result: hateoas,
    };
  } catch (error) {
    console.error("❌ Error en GET /items:", error);

    throw {
      code: 500,
      message: error.message,
    };
  }
};

// FILTRAR ITEMS
const getFilteredItems = async ({
  max_price,
  min_price,
}) => {
  let filtros = [];

  if (min_price) filtros.push(`price >= ${min_price}`);
  if (max_price) filtros.push(`price <= ${max_price}`);

  let consulta = "SELECT * FROM item";

  if (filtros.length > 0) {
    consulta += " WHERE " + filtros.join(" AND ");
  }

  console.log("🔍 Consulta:", consulta);

  const result = await pool.query(consulta);

  return result.rows;
};

// REGISTER
const register = async (email, password) => {
  try {

    // ✅ ENCRIPTAR SOLO UNA VEZ
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const role =
      email === "admin@test.com"
        ? "admin"
        : "user";

    const consulta = `
      INSERT INTO users
      (email, password, role)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [
      email,
      hashedPassword,
      role,
    ];

    const result = await pool.query(
      consulta,
      values
    );

    return result.rows[0];

  } catch (error) {
    console.error(
      "❌ Error al registrar:",
      error
    );

    throw {
      code: error.code,
      message: error.message,
    };
  }
};

module.exports = {
  getItems,
  verificarCredenciales,
  getFilteredItems,
  register,
};