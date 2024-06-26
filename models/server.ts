import express, { Express, json } from "express";
import { dbConnection } from "../database/config";
import routesBills from "../routes/bills-routes";
import routesUsers from "../routes/users-routes";
import cors from "cors";

export class Server {
  app: Express;
  port: number | string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(json());
    this.app.use(
      cors({
        origin: "http://localhost:5173",
      })
    );
  }

  routes() {
    this.app.use("/bills", routesBills);
    this.app.use("/users", routesUsers);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`El puerto ${this.port} está conectado`);
    });
  }
}
