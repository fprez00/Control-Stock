// archivo: src/middlewares/auth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function auth(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // El token debería incluir { id, username } u otros campos
    req.user = decoded; // por ejemplo, { id: 5, username: "algo" }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}
