import mongoose, { Document, Model, Schema } from "mongoose";
import { Express } from "express";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "./user.model";
import { idText } from "typescript";

export interface IOrder extends Document {
  courseId: string;
  userId: string;
  payment_info: object;
}

const orderSchema = new Schema<IOrder>(
  {
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    payment_info: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);
const OrderModel: Model<IOrder> = mongoose.model("Order", orderSchema);
export default OrderModel;
