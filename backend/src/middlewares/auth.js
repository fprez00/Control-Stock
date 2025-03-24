import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Middleware para verificar el token JWT
export default function auth(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardo la info del usuario en req.user
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}
