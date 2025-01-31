import { Router } from "express";
import passport from "passport";
import { userDao } from "../dao/mongo/user.dao.js";
import { SessionController } from "../controllers/session.controller.js";
import { UserResponseDto } from "../dto/user.dto.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";

const sessionController = new SessionController();
const router = Router();

router.post("/register", passportCall("register"), sessionController.register);
router.post("/login", passportCall("login"), sessionController.login);
router.get("/logout", sessionController.logout);

router.get("/current", passportCall("jwt"), authorization("admin"), async (req, res) => {
  try {
    const user = await userDao.getById(req.user.id);
    const userResponse = new UserResponseDto(user);

    res.status(200).json({
      status: "success",
      user: {
        full_name: userResponse.full_name,
        role: userResponse.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    session: false,
  }),
  (req, res) => {
    res.status(200).json({ status: "success", payload: req.user });
  }
);

export default router

