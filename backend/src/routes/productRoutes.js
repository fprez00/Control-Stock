import { Router } from "express";
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  disableProduct,
} from "../controllers/productController.js";
import auth from "../middlewares/auth.js";  // Importamos

const router = Router();

// GET => /api/products
router.get("/", getProducts);

// POST => /api/products
// Si quieres proteger: router.post("/", auth, createProduct);
router.post("/", auth, createProduct);

// GET => /api/products/:id
router.get("/:id", getProductById);

// PUT => /api/products/:id
router.patch("/:id", auth, updateProduct);

// DELETE => /api/products/:id
// Digamos que quieres "desactivar" el producto con un PATCH
router.patch("/:id/disable", auth, disableProduct);


export default router;
