import { Request, Response, NextFunction } from "express";
import UserModel, { IUser } from "../models/user.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import redisClient from "../utils/redis";
import CourseModel from "../models/course.model";

dotenv.config();

// create course
export const createCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = await CourseModel.create(req.body);
    res.status(201).json({
      success: true,
      course,
    });
  }
);
