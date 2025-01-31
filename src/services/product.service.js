import { productDao } from "../dao/mongo/product.dao.js";
import { ProductResponseDto } from "../dto/productResponse.dto.js";
import mongoose from "mongoose";

class ProductService {
  async getAll(query, options) {
    return productDao.getAll(query, options);
  }

  async getById(id) {
    const product = await productDao.getById(id);
    return product ? new ProductResponseDto(product) : null;
  }

  async deleteOne(id) {
    try {
      console.log("Buscando producto con ID:", id);
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error("ID inválido:", id);
        return null;
      }
  
      const product = await productDao.getById(id);
      if (!product) {
        console.log("Producto no encontrado:", id);
        return null;
      }
  
      console.log("Producto encontrado, eliminando:", product);
  
      await productDao.deleteOne(id);
      console.log("Producto eliminado:", id);
      return true;
    } catch (error) {
      console.error("Error eliminando producto:", error);
      throw error;
    }
  }
  

  async update(id, data) {
    const product = await productDao.getById(id);
    return product ? productDao.update(id, data) : null;
  }

  async create(data) {
    return productDao.create(data);
  }
}

export const productService = new ProductService();
