import pool from "../config/db.js";

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// Crear un producto
export const createProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;

    // userID real, obtenido de req.user gracias al middleware
    const userId = req.user.id;

    await pool.query(
      "INSERT INTO productos (nombre, descripcion, precio, stock, created_by) VALUES (?, ?, ?, ?, ?)",
      [nombre, descripcion, precio, stock, userId]
    );

    return res.status(201).json({ message: "Producto creado correctamente" });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};

// Obtener producto por ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener producto", error });
  }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, stock } = req.body;
    
    // Valida si llegan datos
    // if (!nombre || !precio ...) { ... }

    // Realiza el UPDATE en la DB
    await pool.query(
      "UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?",
      [nombre, precio, stock, id]
    );

    return res.json({ message: "Producto actualizado con éxito" });
  } catch (error) {
    console.error("Error updateProduct:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};


// Eliminar producto
export const disableProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // Actualiza sólo is_active
    await pool.query("UPDATE productos SET is_active = false WHERE id = ?", [id]);
    
    return res.json({ message: "Producto desactivado correctamente" });
  } catch (error) {
    console.error("Error al desactivar producto:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
