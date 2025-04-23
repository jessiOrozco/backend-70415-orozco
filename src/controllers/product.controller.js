import ProductService from "../services/product.service.js";
const productService = new ProductService();

class ProductController{
    async listProducts(req, res) {
        try{
            const { limit = 10, page = 1, sort, query } = req.query;
            const productos = await productService.getProducts({
                limit,
                page,
                sort,
                query,
            })
            res.json({
                status: 'success',
                payload: productos,
                totalPages: productos.totalPages,
                prevPage: productos.prevPage,
                nextPage: productos.nextPage,
                page: productos.page,
                hasPrevPage: productos.hasPrevPage,
                hasNextPage: productos.hasNextPage,
                prevLink: productos.hasPrevPage ? `/api/products?limit=${limit}&page=${productos.prevPage}&sort=${sort}&query=${query}` : null,
                nextLink: productos.hasNextPage ? `/api/products?limit=${limit}&page=${productos.nextPage}&sort=${sort}&query=${query}` : null,
            });

        }catch(err){
            console.error(err)
        }
    }

    async getProduct(req, res) {
        const id = req.params.id;
        try{
            const product = productService.getProduct(id);
            if (!product) {
                return res.status(404).json({error: 'Product not found'});
            }
            res.json(product);
        }catch(err){
            console.error(err)
            res.status(500).json({error: 'Error al buscar el producto' + err});
        }
    }

    async createProduct(req, res) {
        const nuevoProducto = req.body;
        try{
            const producto = productService.createProduct(nuevoProducto);
            if (!producto) {
                return res.status(404).json({error: 'Product not created'});
            }
            res.json(producto);
        }catch(err){
            console.error(err)
            return res.status(500).json({error: 'Error al crear el producto' + err});
        }
    }

    async updateProduct(req, res) {
        const id = req.params.id;
        const productoActualizado = req.body;

        try{
            const producto = await productService.updateProduct(id, productoActualizado);
            if (!producto) {
                return res.status(404).json({error: 'Product not updated'});
            }
            res.json(producto);
        }catch(err){
            console.error("Error al actualizar producto", err)
            res.status(500).json({error: 'Error al actualizar el producto' + err});
        }
    }
    async deleteProduct(req, res) {
        const id = req.params.id;
        try{
            const product = await productService.deleteProduct(id)
            if (!product) {
                return res.status(404).json({error: 'Product not found'});
            }
            console.log("Se elimino correctamente el producto")
            res.json({status: 'success'});
        }catch(err){
            console.error(err)
            res.status(500).json({error: 'Error al eliminar el producto'});
        }
    }
}

export default ProductController;