import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js"; // 👈 Importamos las rutas de productos

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas de usuarios
app.use("/api/users", userRoutes);

// Rutas de productos
app.use("/api/products", productRoutes); // 👈 Montamos las rutas de productos

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
