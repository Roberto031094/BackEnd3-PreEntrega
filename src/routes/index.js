import { Router } from "express";
import productsRouter from "./products.routes.js";
import cartsRouter from "./carts.routes.js";
import sessionRouter from "./session.routes.js";
import mailRouter from "./email.routes.js";
import mocksRouter from "./mocks.router.js";


const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/session", sessionRouter);
router.use("/email", mailRouter);
router.use("/mocks", mocksRouter);


export default router;
