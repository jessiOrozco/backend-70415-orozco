import TicketsDao from "../dao/tickets.dao.js"

const ticketDao = new TicketsDao()

class TicketRepository{

    async createTicket(ticket){
        return await ticketDao.createTicket(ticket);
    }

    async getTicket(ticket){
        return await ticketDao.findById(ticket);
    }

}

export default new TicketRepository()