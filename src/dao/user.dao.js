import UsuarioModel from "./models/usuarios.model.js";
import usuariosModel from "./models/usuarios.model.js";

class UserDao {
    async findById(id) {
        return usuariosModel.findById(id);
    }
    async findByEmail(email) {
        return usuariosModel.findOne({email: email});
    }

    async save(userData) {
        const user = new UsuarioModel(userData);
        return await user.save();
    }
}

export default new UserDao();