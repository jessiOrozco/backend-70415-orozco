export class TicketDto {
    constructor(ticket) {
        this.number = ticket.number;
        this.client = ticket.client;
        this.amount = ticket.amount;
        this.date = ticket.date;
    }
}