import cartModel from "./models/cart.model.js";
import CartModel from "./models/cart.model.js";

class CartDao{
    async findById(cid){
        return cartModel.findById(cid);
    }

    async create(){
        const cart = new CartModel();
        return await cart.save();
    }

    async addProductToCart(productId){
        try {
            const cart = await CartModel.findById(cartId);

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            const productIndex = cart.products.findIndex(item => item.product._id.toString() === productId);

            if (productIndex !== -1) {
                cart.products[productIndex].quantity = newQuantity;


                cart.markModified('products');

                await cart.save();
                return cart;
            } else {
                throw new Error('Producto no encontrado en el carrito');
            }
        } catch (error) {
            console.error('Error al actualizar la cantidad del producto en el carrito', error);
            throw error;
        }
    }

    async updateCart(cart){
        return await CartModel.bulkSave(cart);
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

}

export default new CartDao();