import { userModel } from "./models/user.model.js";

class UserDao {
  async getAll() {
    return await userModel.find();
  }

  async getById(id) {
    return await userModel.findById(id);
  }

  async getByEmail(email) {
    return await userModel.findOne({ email }).populate("cart");
  }

  async create(data) {
    return await userModel.create(data);
  }

  async update(id, data) {
    return await userModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteOne(id) {
    return await userModel.deleteOne({ _id: id });
  }
}

export const userDao = new UserDao();

