import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { createProduct } from "../controllers/productController.js";
import { updateTypeProduct } from "../controllers/typeProductsController.js";


import auth from "../middlewares/auth.js"; // Importar el middleware

const router = Router();

// Rutas públicas (sin middleware)
router.post("/register", registerUser);
router.post("/login", loginUser);

// Ruta protegida (de ejemplo): solo se accede si el token es válido
router.post("/createProduct", auth, createProduct);

router.patch("/:id", auth, updateTypeProduct);


export default router;
