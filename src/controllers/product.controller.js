import { productDao } from "../dao/mongo/product.dao.js";
import { productService } from "../services/product.service.js";

export class ProductController {
  async getAll(req, res) {
    try {
      const { limit, page, sort, category, status } = req.query;
      const options = {
        limit: limit || 10,
        page: page || 1,
        sort: { price: sort === "asc" ? 1 : -1 },
      };

      let filter = {};
      if (category) filter.category = category;
      if (status) filter.status = status;

      const products = await productDao.getAll(filter, options);
      return res.status(200).json({ status: "success", products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }

  async getById(req, res) {
    try {
      const { pid } = req.params;
      const product = await productService.getById(pid);
      if (!product) {
        return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });
      }
      res.status(200).json({ status: "success", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }

  async deleteOne(req, res) {
    try {
      const { pid } = req.params;
      const product = await productService.deleteOne(pid);
      if (!product) {
        return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });
      }
      res.status(200).json({ status: "success", msg: `El producto con el id ${pid} fue eliminado` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }

  async update(req, res) {
    try {
      const { pid } = req.params;
      const productData = req.body;
      const product = await productDao.update(pid, productData);
      if (!product) {
        return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });
      }
      res.status(200).json({ status: "success", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }

  async create(req, res) {
    try {
      const productData = req.body;
      const product = await productDao.create(productData);
      res.status(201).json({ status: "success", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }
}

