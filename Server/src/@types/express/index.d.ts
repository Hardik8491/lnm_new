import { Request, Response, NextFunction } from "express";

import { Redis } from "ioredis";
import { IUser } from "../../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }

}
