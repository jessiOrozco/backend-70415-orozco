import CartRepository from "../repositories/cart.repository.js";
import TicketRepository from "../repositories/ticket.repository.js";
import ticketRepository from "../repositories/ticket.repository.js";

class TicketService {
    async createTicket(cid, user){

        try {
            const cart = await CartRepository.findCart(cid);
            if (!cart) throw ("Error no existe el carrito");
            let sumaTotal = 0;

            const productosEnCarrito = cart.products.map(item => ({
                product: item.product.toObject(),
                //Lo convertimos a objeto para pasar las restricciones de Exp Handlebars.
                quantity: item.quantity
            }))

            productosEnCarrito.forEach(item => {
                sumaTotal += item.product.price * item.quantity;
            })

            let ticket = {
                cart: cid,
                amount: sumaTotal,
                purchase: user
            }

            return await TicketRepository.createTicket(ticket)

        }catch (error){
            console.log("Error en el servidor ", error)
            throw error
        }
    }

    async getTicket(tid){
        try{
            const ticket = await ticketRepository.getTicket(tid);

            let products = ticket.cart.products.map(item => ({
                product: item.product.toObject(),
                quantity: item.quantity
            }));



            return {ticket: ticket, products: products};

        }catch (error){
            console.log("Error en el servidor ", error)
        }
    }
}

export default new TicketService();