export class ProductDto {
    constructor(product) {
        this.description = product.description;
        this.title = product.title;
        this.price = product.price;
        this.img = product.img;
        this.category = product.category;

    }
}