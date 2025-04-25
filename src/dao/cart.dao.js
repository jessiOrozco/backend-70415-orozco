import cartModel from "./models/cart.model.js";
import CartModel from "./models/cart.model.js";

class CartDao{
    async findById(cid){
        return cartModel.findById(cid);
    }

    async create(userId){
        const cart = new CartModel({products: [], user: userId});
        return await cart.save();
    }

    async addProductToCart(cart){
        return await cart.save()
    }

    async updateCart(cart){
        return await cart.save()
    }

    async outedCart(cartId){
        try {
            const cart = await CartModel.findByIdAndUpdate(
                cartId,
                {products: []},
                {new: true}
            );
            return cart
        }catch(err){
            throw err;
        }
    }

    async deletedProduct(pid, cid){
        try{
            const cart = await CartModel.findById(cid)
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            cart.products = cart.products.filter(item => item.product._id.toString() !== pid);
            await cart.save()
            return cart
        }catch(err){
            console.log("Hay un error al eliminar el producto",err)
        }
    }

}

export default new CartDao();