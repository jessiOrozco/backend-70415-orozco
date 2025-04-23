import ProductDao from "../dao/product.dao.js";
import productDao from "../dao/product.dao.js";

export default class ProductService {
    async getProducts({limit = 10, page = 1, sort, query} = {}) {
        try{
            const skip = (page - 1) * limit;

            let queryOptions = {}
            if(query){
                queryOptions = {category: query}
            }
            const sortOptions = {}
            if(sort){
                if(sort === 'asc'||sort === 'desc'){
                    sortOptions.price = sort === "asc" ? 1 : -1
                }
            }
            const products = await ProductDao.findProducts(queryOptions, sortOptions, skip, limit)
            const totalProducts = await ProductDao.getTotalProducts(queryOptions)

            const totalPages = Math.ceil(totalProducts / limit);
            const hasNextPage = page > 1;
            const hasPrevPage = page < totalPages;
            return {
                docs: products,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
                nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
            };

        }catch (err){
            console.error(err)
        }
    }

    async getProduct(id){
        try{
            const producto = await ProductDao.findProductById(id);
            if (!producto) {
                console.log("Producto no encontrado")
                return null;
            }
            return producto;
        }catch(err){
            console.error(err)
        }
    }

    async createProduct({title, description, price, img, code, stock, category, thumbnails}){
        try{
            if (!title || !description || !price || !code || !stock || !category){
                console.log("Todos los campos son obligatorios")
                return;
            }
            const existeProducto = await ProductDao.findProductByCode(code)
            if(existeProducto){
                console.log("Producto existe")
                return;
            }
            return ProductDao.createProduct({title, description, price, img, code, stock, category, thumbnails});

        }catch (err){
            console.error(err)
            return null;
        }
    }

    async updateProduct(id, producto){
        try {
            const updeteado = await ProductDao.findAndUpdateProduct(id, producto);
            if(!updeteado){
                console.log("Producto no actualizado")
            }
            console.log("Producto actualizado")
            return updeteado
        }catch (err){
            console.error(err)
        }
    }

    async deleteProduct(id){
        try{
            const product = await ProductDao.findProductAndDeleter(id);
            if(!product){
                console.log("Producto no encontrado")
                return null;
            }
            console.log("Producto eliminado")
            return product;
        }catch(err){
            console.error(err)
            return null;
        }
    }
}