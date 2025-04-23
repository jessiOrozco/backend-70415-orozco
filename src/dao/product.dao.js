import ProductModel from "./models/product.model.js";

class ProductDao{
    async findProducts(queryOptions, sortOptions, skip, limit){
        await ProductModel.find(queryOptions)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
    }
    async getTotalProducts(queryOptions){
         await ProductModel.countDocuments(queryOptions)
    }

    async findProductById(id){
        await ProductModel.findById(id)
    }
    async findProductByCode(code){
        await ProductModel.findOne({code: code})
    }

    async createProduct({title, description, price, img, code, stock, category, thumbnails}){
        const product = new ProductModel({
            title,
            description,
            price,
            img,
            code,
            stock,
            category,
            status: true,
            thumbnails:  thumbnails || []
        })

        await product.save()

    }
    async findAndUpdateProduct(id, product){
        await ProductModel.findByIdAndUpdate(id, product)
    }
    async findProductAndDeleter(id){
        await ProductModel.findByIdAndDelete(id)
    }
}

export default new ProductDao();