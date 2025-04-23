import userService from '../services/user.service.js';
import jwt from 'jsonwebtoken'
import UserDto from "../dto/user.dto.js";

class UserController {
    async register(req,res){
        const { first_name, last_name, email, age, password, rol } = req.body;
        try{
            const nuevoUsuario = await userService.registerUser({ first_name, last_name, email, age, password, rol });

            const token = await jwt.sign({
                usuario: `${nuevoUsuario.first_name} ${nuevoUsuario.last_name}`,
                email: `${nuevoUsuario.email}`,
                rol: `${nuevoUsuario.rol}`,
            }, "coderhouse", {expiresIn: "1h"});
            res.cookie("coderCookieToken", token, { maxAge:360000, httpOnly: true });
            res.redirect("/api/sessions/current");
        }catch(err){
            res.status(500).send("Error del server")
        }
    }

    async login(req,res){

        const { email, password } = req.body;


        try{
            const user = await userService.loginUser(email, password);

            const token = await jwt.sign({
                usuario: `${user.first_name} ${user.last_name}`,
                email: `${user.email}`,
                rol: `${user.rol}`,
                cart: `${user.cart}`
            }, "coderhouse", {expiresIn: "1h"});
            res.cookie("coderCookieToken", token, {maxAge: 360000, httpOnly: true});
            res.redirect("/api/sessions/current");
        }catch(err){
            res.status(500).send("Error del server")
        }
    }

    async current(req,res){
        if(req.user){
            const user = req.user;
            const userDto = new UserDto(user);
            res.redirect("/");
        } else {
            res.send("No autorizado")
        }
    }

    async logout(req,res){
        res.clearCookie("coderCookieToken");
        res.redirect(`/login`);
    }
}

export default UserController;