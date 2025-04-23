import express from "express";
import CartManager from "../managers/cart-manager-db.js";
import CartController from "../controllers/cart.controller.js";
import passport from "passport";
const cartController = new CartController();

const router = express.Router();
const cartManager = new CartManager();

// 1) Creamos un nuevo carrito:
router.post("/",  cartController.create);

// 2) Listamos los productos que pertenecen a determinado carrito.
router.get("/:cid", passport.authenticate("current", {session: false}), cartController.findCart);

// 3) Agregar productos a distintos carritos.
router.post("/:cid/product/:pid", passport.authenticate("current", {session: false}), cartController.addProductToCart);

// 4) Eliminamos un producto específico del carrito.
router.delete('/:cid/product/:pid', passport.authenticate("current", {session: false}), cartController.deleteProductCart);

// 5) Actualizamos productos del carrito:
router.put('/:cid', passport.authenticate("current", {session: false}), cartController.updatedProducts);

// 6) Actualizamos las cantidades de productos
router.put('/:cid/product/:pid', passport.authenticate("current", {session: false}), cartController.updateProductQuantity);

// 7) Vaciamos el carrito:
router.delete('/:cid', passport.authenticate("current", {session: false}), cartController.outCart);

export default router;
