import express from "express";
import ProductManager from "../managers/product-manager-db.js";
import CartManager from "../managers/cart-manager-db.js";

const router = express.Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

import passport from "passport";

//middleware
import {onlyAdmin, onlyUser} from "../middleware/auth.js";


router.get("/products", passport.authenticate("current", {session: false}), onlyUser, async (req, res) => {
   try {
      const { page = 1, limit = 2 } = req.query;
      const productos = await productManager.getProducts({
         page: parseInt(page),
         limit: parseInt(limit)
      });

      const nuevoArray = productos.docs.map(producto => {
         const { ...rest } = producto.toObject();
         return rest;
      });

      res.render("products", {
         productos: nuevoArray,
         hasPrevPage: productos.hasPrevPage,
         hasNextPage: productos.hasNextPage,
         prevPage: productos.prevPage,
         nextPage: productos.nextPage,
         currentPage: productos.page,
         totalPages: productos.totalPages,
         user: req.user,
      });

   } catch (error) {
      console.error("Error al obtener productos", error);
      res.status(500).json({
         status: 'error',
         error: "Error interno del servidor"
      });
   }
});

router.get("/carts/:cid", passport.authenticate("current", {session: false}), onlyUser, async (req, res) => {
   const cartId = req.params.cid;

   try {
      const carrito = await cartManager.getCarritoById(cartId);

      if (!carrito) {
         console.log("No existe ese carrito con el id");
         return res.status(404).json({ error: "Carrito no encontrado" });
      }

      const productosEnCarrito = carrito.products.map(item => ({
         product: item.product.toObject(),
         //Lo convertimos a objeto para pasar las restricciones de Exp Handlebars. 
         quantity: item.quantity
      }));

      res.render("carts", { productos: productosEnCarrito });
   } catch (error) {
      console.error("Error al obtener el carrito", error);
      res.status(500).json({ error: "Error interno del servidor" });
   }
});

// Backend 2: 

router.get("/register", (req, res) => {
   res.render("register"); 
})

router.get("/login", (req, res) => {
   res.render("login"); 
})

router.get("/realtimeproducts", passport.authenticate("current", {session: false}), onlyAdmin, (req, res) => {
   res.render("realtimeproducts")
})

router.get("/", passport.authenticate("current", {session: false}), async (req, res) => {
   res.render("home", {user: req.user, layout:"main", userExist: true});
})

export default router;
