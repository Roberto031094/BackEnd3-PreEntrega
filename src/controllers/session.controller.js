import { createToken } from "../utils/jwt.js";

export class SessionController {
  async register(req, res) {
    try {
      res.status(201).json({ status: "success", msg: "Usuario Registrado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }

  async login(req, res) {
    try {
      const token = createToken(req.user);
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ status: "success", payload: req.user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }

  async logout(req, res) {
    try {
      req.session.destroy();
      res.status(200).json({ status: "success", msg: "Sesión cerrada" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }
}

