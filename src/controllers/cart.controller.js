import CartService from "../services/cart.service.js";

class CartController {
    async create(req,res){
        const {userId, products} = req.body;
        try{
            const cart = await CartService.createCart(userId, products);
            res.json(cart);
        }catch(err){
            console.error("Error al crear un nuevo carrito", error)
            res.status(500).json({ error: "Error del Server"})
        }
    }

    async findCart(req,res){
        const cartId = req.params.cid;
        try {
            const carrito = await CartService.findCart(cartId);

            if (!carrito) {
                console.log("No existe ese carrito con el id");
                return res.status(404).json({ error: "Carrito no encontrado" });
            }

            return res.json(carrito.products);
        } catch (error) {
            console.error("Error al obtener el carrito", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async addProductToCart(req,res){
        const cartId = req.params.cid
        const productid = req.params.pid
        const quantity = req.body.quantity || 1;


        try{
            const actualizarCarrito = await CartService.addProductToCart(cartId, productid, quantity);
            res.json(actualizarCarrito);
        }catch (err){
            res.status(500).send("Error en el servidor ", err)
        }
    }

    async deleteProductCart(req,res){
        const {cid,pid} = req.params;
        try{
            const cart = await CartService.deletedProduct(cid,pid)
            res.json({message: "Producto eliminado"});
        }catch (error){
            res.status(500).send("Error en el servidor ", error)
        }
    }

    async updatedProducts(req, res) {
        const {cid} = req.params;
        const updatedProducts = req.body;
        try {
            const updatedCart = await CartService.updatedProduct(cid, updatedProducts);
            res.json(updatedCart);
        }catch (err){
            res.status(500).send("Error en el servidor ", err)
        }
    }

    async updateProductQuantity(req,res){
        debugger
        const {cid, pid} = req.params;
        const {quantity} = req.body;
        try {
            const cart = await CartService.findCart(cid);
            if (!cart) throw new Error("Cart not exists");

            const updatedCart = await CartService.updatedQuantityCart(cid, pid, quantity);
            res.json(updatedCart);
        }catch (error){
            res.status(500).send("Error en el servidor ", error)
        }
    }

    async outCart(req,res){
        const {cid} = req.params;
        try{
            const updatedCart = await CartService.outedCart(cid, pid);
            res.json(updatedCart);
        }catch(err){
            console.log(err)
            res.status(500).send("Error en el servidor ", err)
        }

    }
}

export default CartController;