import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import dotenv from "dotenv";

import OrderModel from "../models/order.model";

dotenv.config();

// create order
export const newOrder = CatchAsyncError(
  async (data:any, res: Response, next: NextFunction) => {
    const order = await OrderModel.create(data);
  next(order);
  }
);
