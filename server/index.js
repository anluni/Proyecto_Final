const express = require("express");
const fs = require("fs");
const cors = require("cors");
const pool = require("./database/db");
const jwt = require("jsonwebtoken");

const {
  getItems,
  getFilteredItems,
  register,
  verificarCredenciales,
} = require("./consultas");

require("dotenv").config();

const {
  authMiddleware,
  verificarAdmin,
} = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(cors());

// Middleware logs
const reporte = async (req, res, next) => {
  console.log(
    `${req.method} ${req.url} En la fecha ${new Date().toLocaleString()}`
  );

  next();
};

app.use(reporte);

// Puerto
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(
    "💻 Servidor encendido y funcionando en puerto " + PORT
  );
});

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // NO usar bcrypt aquí
    // register() ya encripta en consultas.js

    let user = await register(email, password);

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Usuario creado con éxito!",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (error) {

    console.error("❌ Error register:", error);

    res.status(500).json({
      code: error.code,
      message: error.message,
    });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await verificarCredenciales(
      email,
      password
    );

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      ok: true,
      message: "Sesión iniciada con éxito",
      token,
      user,
    });

  } catch (error) {

    console.log(
      "❌ Error al hacer login:",
      error
    );

    return res.status(401).json({
      ok: false,
      message:
        error.message || "Credenciales incorrectas",
    });
  }
});

// GET ITEMS
app.get("/items", async (req, res) => {
  try {

    const items = await getItems(req.query);

    res.json(items);

  } catch (error) {

    console.error(
      "❌ Error en GET /items:",
      error
    );

    res.status(500).json({
      error: error.code,
      message: error.message,
    });
  }
});

// FILTER ITEMS
app.get("/items/filter", async (req, res) => {
  try {

    const items = await getFilteredItems(req.query);

    res.json(items);

  } catch (error) {

    console.error(
      "❌ Error en GET /items/filter:",
      error
    );

    res.status(500).json({
      error: error.code,
      message: error.message,
    });
  }
});

// ITEM POR ID
app.get("/items/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM item WHERE id = $1",
      [id]
    );

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.code,
      message: error.message,
    });
  }
});

// CREAR PRODUCTO
app.post("/items", async (req, res) => {
  try {

    const { name, price, image } = req.body;

    const result = await pool.query(
      `
      INSERT INTO item
      (name, price, image)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [name, price, image]
    );

    res.status(201).json({
      message: "Producto creado con éxito!",
      item: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// EDITAR PRODUCTO
app.put("/items/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const { name, price, image } = req.body;

    const consulta = `
      UPDATE item
      SET name = $1,
          price = $2,
          image = $3
      WHERE id = $4
      RETURNING *
    `;

    const values = [
      name,
      price,
      image,
      id,
    ];

    const result = await pool.query(
      consulta,
      values
    );

    res.status(200).json({
      message:
        "Producto actualizado con éxito!",
      item: result.rows[0],
    });

  } catch (error) {

    console.error(
      "❌ Error en PUT /items:",
      error
    );

    res.status(500).json({
      error: error.code,
      message: error.message,
    });
  }
});

// ELIMINAR PRODUCTO
app.delete(
  "/items/:id",
  authMiddleware,
  async (req, res) => {
    try {

      const { id } = req.params;

      const consulta =
        "DELETE FROM item WHERE id = $1";

      const values = [id];

      const result = await pool.query(
        consulta,
        values
      );

      if (result.rowCount === 0) {
        return res.status(404).json({
          message:
            "Producto no encontrado",
        });
      }

      res.json({
        message:
          "Producto eliminado con éxito!",
      });

    } catch (error) {

      console.error(
        "❌ Error en DELETE /items:",
        error
      );

      res.status(500).json({
        error: error.code,
        message: error.message,
      });
    }
  }
);

module.exports = app;