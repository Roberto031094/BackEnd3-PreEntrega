import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";

const productController = new ProductController();
const router = Router();

const adminAuth = [passportCall('jwt'), authorization('admin')];

router.get("/", productController.getAll);
router.get("/:pid", productController.getById);
router.delete("/:pid", ...adminAuth, productController.deleteOne);
router.put("/:pid", ...adminAuth, productController.update);
router.post("/", checkProductData, ...adminAuth, productController.create);

export default router;

