import express from "express";
import ProductManager from "../managers/product-manager-db.js";
import ProductController from "../controllers/product.controller.js";

const router = express.Router();
const productManager = new ProductManager();
const productController = new ProductController();

// Modificación 2 entrega:
router.get("/", productController.listProducts);

// 2) Traer solo un producto por id:
router.get("/:pid",productController.getProduct);

// 3) Agregar nuevo producto:
router.post("/", productController.createProduct);

// 4) Actualizar por ID
router.put("/:pid", productController.updateProduct);

// 5) Eliminar producto:
router.delete("/:pid", productController.deleteProduct);

export default router;
