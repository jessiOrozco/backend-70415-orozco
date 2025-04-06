import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    age: Number,
    password: String,
    cart: String, 
    rol: {
        type: String, 
        enum: ["admin", "user"], 
        default: "user"
    }
}); 

const UsuarioModel = mongoose.model("usuarios", usuarioSchema); 

export default UsuarioModel; 
