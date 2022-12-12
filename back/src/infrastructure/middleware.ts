import { NextFunction, Response } from "express";
import firebaseApp, { App } from "../config/firebase/admin";
import { AuthenticatedRequest } from "../type/type";

interface AuthTokenArgs {
  req: AuthenticatedRequest;
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

export const checkIfAuthenticated = (req, res, next) => {
  const nextFunc = async () => {
    try {
      const { authToken } = req;
      if (!authToken) {
        return res
          .status(401)
          .send({ error: 'You are not authorized to make this request' });
      }
      const userInfo = await firebaseApp
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