import TicketService from "../services/ticket.service.js";

class TicketController {
    async generateTicket(req, res) {
        const { cid, user } = req.params;
        try{
            const ticket = await TicketService.createTicket(cid, user);
            res.status(200).json({ticket: ticket.code})
        }catch(err){
            res.status(500).send(err)
        }
    }

    async getTicket(req, res) {
        const {idTicket} = req.params;
        try{
            const ticket = await TicketService.getTicket(idTicket);
            res.render("ticket", {ticket: ticket.ticket.toObject(), products: ticket.products});
        }catch(err){
            res.status(500).send("Error al obtener el ticket")
        }
    }
}

export default TicketController;