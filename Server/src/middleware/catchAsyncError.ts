import { Request, Response, NextFunction } from "express";

export const CatchAsyncError =
  (theFun: any) => (req:Request, res:Response, next: NextFunction) => {
    Promise.resolve(theFun(req, res, next)).catch(next);
  };
