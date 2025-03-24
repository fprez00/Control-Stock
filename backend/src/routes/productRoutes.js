import { Router } from "express";
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
// import auth from "../middlewares/auth.js" (opcional, para rutas protegidas)

const router = Router();

// GET => /api/products
router.get("/", getProducts);

// POST => /api/products
// Si quieres proteger: router.post("/", auth, createProduct);
router.post("/", createProduct);

// GET => /api/products/:id
router.get("/:id", getProductById);

// PUT => /api/products/:id
router.put("/:id", updateProduct);

// DELETE => /api/products/:id
router.delete("/:id", deleteProduct);

export default router;
