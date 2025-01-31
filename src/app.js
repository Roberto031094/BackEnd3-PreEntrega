import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import { Server } from "socket.io";
import { connectMongoDB } from "./config/mongoDB.config.js";
import { initializePassport } from "./config/passport.config.js";
import routes from "./routes/index.js";
import envsConfig from "./config/envs.config.js";
import cors from "cors";


const app = express();

connectMongoDB();
initializePassport();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(express.static("public"));
app.use(
  session({
    secret: envsConfig.SECRET_KEY,
    resave: true, 
    saveUninitialized: true,
  })
);
app.use(cookieParser(envsConfig.SECRET_KEY));
app.use("/api", routes);

const httpServer = app.listen(envsConfig.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${envsConfig.PORT}`);
});

export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Nuevo usuario Conectado");
});
