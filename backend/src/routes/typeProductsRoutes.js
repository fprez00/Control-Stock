import { Router } from "express";
import {
  getTypeProducts,
  createTypeProduct,
  disableTypeProduct
} from "../controllers/typeProductsController.js";
import auth from "../middlewares/auth.js";

const router = Router();

// GET => /api/type_products
router.get("/", auth, getTypeProducts);

// POST => /api/type_products
router.post("/", auth, createTypeProduct);

// PATCH => /api/type_products/:id/disable (borrado lógico)
router.patch("/:id/disable", auth, disableTypeProduct);

export default router;
