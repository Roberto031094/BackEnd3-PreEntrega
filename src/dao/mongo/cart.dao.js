import { cartModel } from "./models/cart.model.js";

class CartDao {
  async getAll() {
    return cartModel.find();
  }

  async getById(id) {
    return cartModel.findById(id);
  }

  async create() {
    return cartModel.create({});
  }

  async update(id, data) {
    return cartModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteOne(id) {
    return cartModel.deleteOne({ _id: id });
  }
}

export const cartDao = new CartDao();

