import { ticketModel } from "./models/ticket.model.js";

class TicketDao {
  async getAll() {
    return await ticketModel.find();
  }

  async getById(id) {
    return await ticketModel.findById(id);
  }

  async getByEmail(email) {
    return await ticketModel.findOne({ email }).populate("cart");
  }

  async create(data) {
    return await ticketModel.create(data);
  }

  async update(id, data) {
    return await ticketModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteOne(id) {
    return await ticketModel.deleteOne({ _id: id });
  }
}

export const ticketDao = new TicketDao();

