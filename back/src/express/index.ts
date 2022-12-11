import * as express from "express";
import { ServiceRegistry } from "../services";
import { UserController } from "./controllers";

export const startServer = async (serviceRegistry: ServiceRegistry) => {
  const app = express();

  app.use(express.json());

  const userController = new UserController(serviceRegistry);

  app.use('/users', userController.buildRoutes());

  app.listen(process.env.PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);
  });
}