import { Router } from "express";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { userModel } from "../dao/mongo/models/user.model.js";
import { cartModel } from "../dao/mongo/models/cart.model.js";

const router = Router();

const generateMockUsers = async (count) => {
  const users = [];

  for (let i = 0; i < count; i++) {
    const newCart = await cartModel.create({ products: [] });

    users.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync("coder123", 10),
      age: faker.number.int({ min: 18, max: 60 }),
      role: faker.helpers.arrayElement(["user", "admin"]),
      cart: newCart._id, 
    });
  }

  return users;
};

router.get("/mockingusers", async (req, res) => {
  try {
    const users = await generateMockUsers(50);
    await userModel.insertMany(users);
    res.json({ message: "Usuarios generados con éxito", users });
  } catch (error) {
    console.error("Error generando usuarios:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;



