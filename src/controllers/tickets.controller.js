import CartRepository from "../repositories/cart.repository.js";
import TicketRepository from "../repositories/ticket.repository.js";

class TicketController {
    async generateTicket(req, res) {
        const { cid } = req.body;
        try{
            const ticket = TicketService.createTicket(req.body)
            return res.status(200).json(ticket);
        }catch(err){
            res.status(500).send(err)
        }
    }
}

export default TicketController;