export class CartDto{
    constructor(cart){
        this.product = cart.product;
        this.quantity = cart.quantity;
    }
}