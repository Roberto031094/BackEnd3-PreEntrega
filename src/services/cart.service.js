import { cartDao } from "../dao/mongo/cart.dao.js";
import { productDao } from "../dao/mongo/product.dao.js";

class CartService {
  async createCart() {
    return cartDao.create();
  }

  async getCartById(id) {
    return cartDao.getById(id);
  }

  async addProductToCart(cid, pid) {
    const cart = await cartDao.getById(cid);
    if (!cart) return null;

    const productInCart = cart.products.find((element) => element.product == pid);

    if (productInCart) {
      productInCart.quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    return cartDao.update(cid, cart);
  }

  async deleteProductToCart(cid, pid) {
    const cart = await cartDao.getById(cid);
    if (!cart) return null;

    cart.products = cart.products.filter((prod) => prod.product != pid);
    return cartDao.update(cid, cart);
  }

  async updateQuantityProductInCart(cid, pid, quantity) {
    const cart = await cartDao.getById(cid);
    if (!cart) return null;

    const productIndex = cart.products.findIndex((element) => element.product == pid);
    if (productIndex === -1) return null;

    cart.products[productIndex].quantity = quantity;
    return cartDao.update(cid, cart);
  }

  async clearProductsToCart(id) {
    const cart = await cartDao.getById(id);
    if (!cart) return null;

    cart.products = [];
    return cartDao.update(id, cart);
  }

  async purchaseCart(id) {
    const cart = await cartDao.getById(id);
    if (!cart) return null;

    let total = 0;
    const remainingProducts = [];

    for (const productCart of cart.products) {
      const prod = await productDao.getById(productCart.product);

      if (prod && prod.stock >= productCart.quantity) {
        total += prod.price * productCart.quantity;
        prod.stock -= productCart.quantity;
        await productDao.update(prod._id, { stock: prod.stock });
      } else {
        remainingProducts.push(productCart);
      }
    }

    await cartDao.update(id, { products: remainingProducts });
    return total;
  }
}

export const cartService = new CartService();

