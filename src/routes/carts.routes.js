import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

const isAdmin = authorization("admin");
const isUser = authorization("user");
const passportAuth = passportCall('jwt');

router.post("/", passportAuth, isAdmin, cartController.createCart);
router.get("/:cid", passportAuth, isUser, cartController.getCartById);
router.post("/:cid/product/:pid", passportAuth, isUser, cartController.addProductToCart);
router.post("/:cid/purchase", passportAuth, isUser, cartController.purchaseCart);
router.delete("/:cid/product/:pid", passportAuth, isUser, cartController.deleteProductToCart);
router.put("/:cid/product/:pid", passportAuth, isUser, cartController.updateQuantityProductInCart);
router.delete("/:cid", passportAuth, isAdmin, cartController.clearProductsToCart);

export default router;

