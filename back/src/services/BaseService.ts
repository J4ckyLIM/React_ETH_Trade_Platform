import { App } from "../config/firebase/admin";

export abstract class BaseService {
  protected app;

  constructor(app: App) {
    this.app = app;
  }
}