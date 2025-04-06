//import dao
import userDao from "../dao/user.dao.js"


class UserRepository {

    async createUser(userData) {
        return await userDao.save(userData)
    }

    async getUserById(userId) {
        return await userDao.findById(userId)
    }

    async getUserByEmail(email) {
        return await userDao.findByEmail(email);
    }
}

export default new UserRepository();