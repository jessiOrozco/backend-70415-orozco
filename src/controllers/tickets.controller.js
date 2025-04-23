import TicketService from "../services/ticket.service.js";

class TicketController {
    async generateTicket(req, res) {
        const { cid, user } = req.body;
        try{
            const ticket = TicketService.createTicket(cid, user);
            return res.status(200).json(ticket);
        }catch(err){
            res.status(500).send(err)
        }
    }
}

export default TicketController;