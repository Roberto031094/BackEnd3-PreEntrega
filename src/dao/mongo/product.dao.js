import { productModel } from "./models/product.model.js";
import mongoose from "mongoose";

class ProductDao {
  async getAll(query = {}, options = {}) {
    return await productModel.paginate(query, options);
  }

  async getById(id) {
    return await productModel.findById(id);
  }

  async create(data) {
    return await productModel.create(data);
  }

  async update(id, data) {
    return await productModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteOne(id) {
    return await productModel.findByIdAndDelete(id); 
  }  
}

export const productDao = new ProductDao();
