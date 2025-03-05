import passport from "passport";
import { Router } from "express";
import UsuarioModel from "../models/usuarios.model.js";
import jwt from "jsonwebtoken"; 
import { createHash, isValidPassword } from "../utils/util.js"; 

const router = Router(); 

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UsuarioModel.findOne({ email });

        if(!user) {
            return res.status(401).json({ error: "Usuario no encontrado" }); 
        }

        if(!isValidPassword(password, user)) {
            return res.status(401).json({ error: "Contraseña incorrecta" }); 
        }

        //Generar el token: 
        const token = jwt.sign({ first_name: user.first_name, last_name: user.last_name, age: user.age, email: user.email, carrito: user.cart, rol: user.rol }, "coderhouse", {expiresIn: "1h"});

        res.cookie("coderCookieToken", token, { httpOnly: true, maxAge: 3600000 }); 
        res.redirect("/api/sessions/current"); 

    } catch (error) {
        console.error("Error al hacer login", error); 
        res.status(500).json({ error: "Error interno del servidor" }); 
    }
}); 

//Modificacion para tener el cartId: 
import CartManager from "../managers/cart-manager-db.js";
const manager = new CartManager(); 


router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age,  password } = req.body;

        const nuevoCarrito = await manager.crearCarrito(); 

        const user = new UsuarioModel({
            email,
            first_name,
            last_name,
            age,
            password: createHash(password),
            cart: nuevoCarrito._id 
        }); 

        await user.save(); 

        res.redirect("/login"); 

    } catch (error) {
        console.error("Error al registrar usuario", error); 
        res.status(500).json({ error: "Error interno del servidor" }); 
    }
}); 

router.post("/logout", (req, res) => {
    res.clearCookie("coderCookieToken"); 
    res.redirect("/login"); 
}); 

//ARMAMOS ACA LA RUTA CURRENT: 

router.get("/current", passport.authenticate("current", {session: false}), (req, res) => {
    if (req.user) {
        res.render("profile", {usuario: req.user });
    } else {
        res.send("No estas autorizado pequeño saltamontes!");
    }
})

//Verificamos que un usuario sea "admin": 

router.get("/admin", passport.authenticate("current", {session: false}),  (req, res) => {
    if(req.user.rol !== "admin") {
        return res.status(403).send("Acceso Denegado maldito Hacker! mORIRAS!!!"); 
    }

    res.render("admin"); 
})

export default router;