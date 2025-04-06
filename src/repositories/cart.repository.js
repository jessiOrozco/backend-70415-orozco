import cartDao from "../dao/cart.dao.js";
import cartModel from "../dao/models/cart.model.js";

class CartRepository {

    async create(cart){
        cartDao.create(cart);
    }

    async findCart(cartId){

    }

    async deletedProduct(){
        const cart = await cartDao.deletedProduct();
    }

    async updateCart(cart){
       return await cartDao.updateCart(cart);
    }

    async outedCart(cartId){
        return await cartDao.outedCart(cartId);
    }
}

export default new CartRepository();