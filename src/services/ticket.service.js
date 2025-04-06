import CartRepository from "../repositories/cart.repository.js";
import TicketRepository from "../repositories/ticket.repository.js";

class TicketService {
    async createTicket(cid){
        try {
            const cart = CartRepository.findCart(cid);
            if (!cart) throw ("Error no existe el carrito");
            let sumaTotal = 0;

            cart.products.forEach(product => {
                sumaTotal += product.price * product.quantity;
            })

            let ticket = {
                cartId: cid,
                total: sumaTotal,
                purcharser:
            }

            return await TicketRepository.createTicket(ticket)

        }catch (error){
            console.log("Error en el servidor ", error)
            throw error
        }
    }
}

export default new TicketService();