import cartDao from "../dao/cart.dao.js";
import cartModel from "../dao/models/cart.model.js";

class CartRepository {

    async create(cart){
        await cartDao.create(cart);
    }

    async findCart(cartId){
        return await cartDao.findById(cartId);
    }

    async deletedProduct(pid, cid){
        await cartDao.deletedProduct(pid, cid);
    }

    async updateCart(cart){
       return await cartDao.updateCart(cart);
    }

    async outedCart(cartId){
        return await cartDao.outedCart(cartId);
    }

    async addProductToCart(cart){
        return await cartDao.addProductToCart(cart);
    }


}

export default new CartRepository();