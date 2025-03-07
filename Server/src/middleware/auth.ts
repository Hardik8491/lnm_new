import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import redisClient from "../utils/redis";

// Authenticated user
export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;
  
    if (!access_token) {
      return next(new ErrorHandler("Please login to access this request", 400));
    }
    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;

    if (!decoded) {
      return next(new ErrorHandler("access token is not valid", 400));
    }
    const user = await redisClient.get(decoded.id as string);

    if (!user) {
      return next(new ErrorHandler("user not found", 400));
    }
    req.user = JSON.parse(user);
    next();
  }
);
// validate user role
export const authorizeRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(new ErrorHandler(`Role: ${req.user?.role}`, 403));
    }
    next();
  };
};
