import { BaseService } from "./BaseService";
import { App } from "../config/firebase/admin";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

export class UserService extends BaseService {
  constructor(app: App) {
    super(app);
  }

  public createUser = async (email: string, password: string): Promise<UserRecord> => {
    const user = await this.app.auth().createUser({
      email,
      password,
    });

    return user;
  }
}