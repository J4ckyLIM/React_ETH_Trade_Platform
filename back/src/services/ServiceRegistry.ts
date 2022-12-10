import { App } from "../../config/firebase/admin";
import { UserService } from "./UserService";

export class ServiceRegistry {
  public readonly userService: UserService;

  constructor(app: App) {
    this.userService = new UserService(app);
  }
}