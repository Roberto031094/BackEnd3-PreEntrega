import mongoose from "mongoose";

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  products: [
    { product: { type: mongoose.Schema.Types.ObjectId, ref: "product" }, quantity: Number },
  ],
});

export const cartModel = mongoose.model(cartCollection, cartSchema);

