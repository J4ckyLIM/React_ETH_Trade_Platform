import { Router } from "express";
import { ServiceRegistry } from "../../services";

export abstract class BaseController {

    protected serviceRegistry: ServiceRegistry;

    constructor(serviceRegistry: ServiceRegistry) {
      this.serviceRegistry = serviceRegistry;
    }

    abstract buildRoutes(): Router;
}