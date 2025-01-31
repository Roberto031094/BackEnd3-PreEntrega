import { v4 as uuid } from "uuid";
import { ticketDao } from "../dao/mongo/ticket.dao.js";
import { sendTicketMail } from "../utils/sendEmail.js";

class TicketService {
  async create(amount, userMail) {
    const ticket = await ticketDao.create({
      code: uuid(),
      purchaser: userMail,
      amount,
    });
    await sendTicketMail(userMail, ticket);
    return ticket;
  }
}

export const ticketService = new TicketService();
