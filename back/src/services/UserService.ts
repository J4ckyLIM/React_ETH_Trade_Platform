import { BaseService } from "./BaseService";
import { App } from "../config/firebase/admin";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { ethers } from "ethers";

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

  public createWalletForUser = async (userId: string): Promise<{ address: string, privateKey: string }> => {
    // We don't want to create a new wallet if the user already has one
    const user = await this.app.firestore().collection("users").doc(userId).get();

    if(user.data() && user.data()?.wallet) {
      return {
        address: user.data().wallet.address,
        privateKey: user.data().wallet.privateKey,
      }
    } else {
      const wallet = ethers.Wallet.createRandom();
      await this.app.firestore().collection("users").doc(userId).set({
        wallet: {
          address: wallet.address,
          privateKey: wallet.privateKey, // TODO: Hash this
          mnemonic: wallet.mnemonic.phrase, // Should not save this unless you want to be hacked
        }
      })

      return {
        address: wallet.address,
        privateKey: wallet.privateKey,
      }
    }
  }
}