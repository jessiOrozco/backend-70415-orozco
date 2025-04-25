import TicketsModel from "./models/tickets.model.js";

class TicketsDao {
    async findById(id){
        return TicketsModel.findOne({code: id});
    }

    async createTicket(ticket){
        const ticketModel = new TicketsModel({cart: ticket.cart, amount: ticket.amount, purchase: ticket.purchase});
        return await ticketModel.save();
    }
}

export default TicketsDao;