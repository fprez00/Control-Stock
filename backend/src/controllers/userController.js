import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js"; // tu conexión a la DB
import dotenv from "dotenv";
import { createProduct } from "./productController.js";

dotenv.config();

export const registerUser = async (req, res) => {
    try {
      const { username, password, nombre } = req.body;
      if (!username || !password || !nombre) {
        return res.status(400).json({ message: "Faltan datos" });
      }
  
      // Encriptar password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Insertar usuario en la DB
      await pool.query(
        "INSERT INTO usuarios (username, password, nombre) VALUES (?, ?, ?)",
        [username, hashedPassword, nombre]
      );
  
      return res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
      console.error("Error en registro:", error);
      return res.status(500).json({ message: "Error en el servidor" });
    }
  };

  export const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Faltan datos" });
      }
  
      const [rows] = await pool.query("SELECT * FROM usuarios WHERE username = ?", [
        username,
      ]);
      if (rows.length === 0) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }
  
      const user = rows[0];
      // Verificar password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
  
      // Generar Token (JWT)
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      // Opcional: guardar el token en la DB (columna `token`)
      await pool.query("UPDATE usuarios SET token = ? WHERE id = ?", [token, user.id]);
  
      return res.status(200).json({
        message: "Login exitoso",
        token,
      });
    } catch (error) {
      console.error("Error en login:", error);
      return res.status(500).json({ message: "Error en el servidor" });
    }
  };
