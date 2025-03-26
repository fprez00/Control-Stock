import pool from "../config/db.js";

/**
 * Obtener la lista de type_productos (solo los activos o todos)
 */
export const getTypeProducts = async (req, res) => {
  try {
    // Si quieres solo activos:
    // const [rows] = await pool.query("SELECT * FROM type_productos WHERE is_active = TRUE");
    const [rows] = await pool.query("SELECT * FROM type_productos");
    return res.json(rows);
  } catch (error) {
    console.error("Error al obtener type_products:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

/**
 * Crear un nuevo type_product
 */
export const createTypeProduct = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ message: "Falta el campo 'nombre'" });
    }

    // Insertar en la DB
    await pool.query("INSERT INTO type_productos (nombre) VALUES (?)", [nombre]);

    return res.status(201).json({ message: "Type_product creado exitosamente" });
  } catch (error) {
    console.error("Error al crear type_product:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

/**
 * Desactivar un type_product (borrado lógico)
 */
export const disableTypeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("UPDATE type_productos SET is_active = FALSE WHERE id = ?", [id]);
    return res.json({ message: "Type_product desactivado correctamente" });
  } catch (error) {
    console.error("Error al desactivar type_product:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const updateTypeProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre } = req.body;
      await pool.query("UPDATE type_productos SET nombre=? WHERE id=?", [nombre, id]);
      return res.json({ message: "Tipo de producto actualizado" });
    } catch (error) {
      console.error("Error updateTypeProduct:", error);
      return res.status(500).json({ message: "Error en el servidor" });
    }
  };
  