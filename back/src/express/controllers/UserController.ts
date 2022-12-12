import { Router, Response, Request } from "express";
import { BaseController } from ".";


export class UserController extends BaseController {

  async createUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const { userService } = this.serviceRegistry;
    try {
      const user = await userService.createUser(email, password);
      res.status(201).json({ user });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async createWallet(req: Request, res: Response) {
    const { userId } = req.params;
    const { userService } = this.serviceRegistry;
    try {
      const walletCreated = await userService.createWalletForUser(userId);
      res.status(201).json({ message: "Wallet created", wallet: walletCreated });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  buildRoutes(): Router {
    const router = Router();
    router.post('/new', this.createUser.bind(this));
    router.post('/:userId/wallet/new', this.createWallet.bind(this));
    return router;
  }
}