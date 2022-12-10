import { Router, Response, Request } from "express";
import { BaseController } from ".";


export class UserController extends BaseController {

  async create(req: Request, res: Response) {
    const { email, password } = req.body;
    const { userService } = this.serviceRegistry;
    try {
      const user = await userService.createUser(email, password);
      res.status(201).json({ user });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  buildRoutes(): Router {
    const router = Router();
    router.post('/new', this.create.bind(this));
    return router;
  }
}