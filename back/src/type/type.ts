import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  authToken: string | null;
  authId?: string;
}