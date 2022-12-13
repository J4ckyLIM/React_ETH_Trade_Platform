import { Router, Response, Request } from "express";
import { BaseController } from ".";
import { checkIfAuthenticated } from "../../infrastructure/middleware";
import { AuthenticatedRequest } from "../../type/type";


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

  async createWallet(req: AuthenticatedRequest, res: Response) {
    const { userId } = req.params;
    const { userService } = this.serviceRegistry;
    try {
      const walletCreated = await userService.createWalletForUser(userId);
      res.status(201).json({ message: "Wallet created", wallet: walletCreated });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async getWallet(req: AuthenticatedRequest, res: Response) {
    const { userId } = req.params;
    try {
      const wallet = await this.serviceRegistry.userService.getWalletFromUser(userId);
      res.status(200).json({ wallet });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  buildRoutes(): Router {
    const router = Router();
    router.post('/new', this.createUser.bind(this));
    router.post('/:userId/wallet/new', checkIfAuthenticated, this.createWallet.bind(this));
    router.get('/:userId/wallet', checkIfAuthenticated, this.getWallet.bind(this));
    return router;
  }
}