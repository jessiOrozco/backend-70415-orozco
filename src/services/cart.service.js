import cartRepository from '../repositories/cart.repository.js';

class CartService {
    async createCart(cartData){
        const cartExists = await cartRepository.findOne(cart._id);
        if(cartExists)throw new Error("Cart already exists");

        return await cartRepository.create(cartData);
    }

    async findCart(cartId){
        const cart = await cartRepository.findCart(cartId);
        if(!cart)throw new Error("Cart not found");
        return cart;
    }

    async addProductToCart(cartId, productId, quantity){
        const cartExists = await cartRepository.findCart(cartId);
        if(!cartExists)throw new Error("Cart not exists");
        const productIndex = cartExists.products.findIndex(item => item.product._id.toString() === productId);

        if(productIndex !== -1) {
            cartExists.products[productIndex].quantity = quantity;
            return await cartRepository.updateCart(cartExists);
        }

        cartRepository.addProductToCart(cartId, productId, quantity);

    }

    async deletedProduct(cid, pid) {
        const cart = await cartRepository.findCart(cid,pid);
        if(!cart)throw new Error("Cart not found");
        return await cartRepository.deletedProduct(cid,pid);
    }

    async updatedProduct(cid, updatedProducts){
        try {
            const cartExists = await cartRepository.findCart(cid);
            if (!cartExists) throw new Error("Cart not found");

            cartExists.products = updatedProducts;

            cartExists.markModified('products');

            return await cartRepository.updateCart(cartExists);
        } catch(err){
            throw err;
        }
    }

    async updatedQuantityCart(cartId, pid, quantity){
        try{
            const cartExists = await cartRepository.findCart(cartId);
            if(!cartExists)throw new Error("Cart not found");
            const productIndex = cartExists.products.findIndex(item => item.product._id.toString() === pid);

            if(productIndex !== -1) {
                cartExists.products[productIndex].quantity = quantity;
                cartExists.markModified('products');

                return cartRepository.updateCart(cartExists);
            }

        }catch (e){
            console.log("Error en el servidor ")
            throw e;

        }
    }

    async outedCart(cartId){
        try{
            const cartExist = await cartRepository.findCart(cartId);
            if(!cartExist)throw new Error("Cart not found");

            return await cartRepository.outedCart(cartId);
        }catch (err){
            console.log("Error en el servidor ")
            throw err;
        }
    }


}

export default new CartService();