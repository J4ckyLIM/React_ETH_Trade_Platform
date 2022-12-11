import { NextFunction, Response } from "express";
import { App } from "../config/firebase/admin";
import { IRequest } from "../type/type";

interface AuthTokenArgs {
  // app: App;
  req: IRequest;
  // res: Response;
  next: NextFunction;
}

interface AuthenticationArgs {
  app: App;
  req: IRequest;
  res: Response;
  next: NextFunction;
}

export const getAuthToken = ({ req, next }: AuthTokenArgs) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
}

export const checkIfAuthenticated = ({ app, req, res, next }: AuthenticationArgs) => {
  const nextFunc = async () => {
    try {
      const { authToken } = req;
      if (!authToken) {
        return res
          .status(401)
          .send({ error: 'You are not authorized to make this request' });
      }
      const userInfo = await app
        .auth()
        .verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    }
  };
  getAuthToken({
    req, next: nextFunc,
  })
 };