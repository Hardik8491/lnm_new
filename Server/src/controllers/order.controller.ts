import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { create } from "domain";
import { createCourse } from "../services/course.service";
import CourseModel from "../models/course.model";
import redisClient from "../utils/redis";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import sendMailer from "../mails/sendMail";
import userModel from "../models/user.model";
import { IOrder } from "../models/order.model";
import { newOrder } from "../services/order.service";
dotenv.config();

// create order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;
      const user = await userModel.findById(req.user?._id);
      const courseExistUser = user?.courses.some((course: any) => {
        course._id.toString() === courseId;
      });
      if (!courseExistUser) {
        return next(
          new ErrorHandler("You hav already purchased this course", 400)
        );
      }
      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }
      const data: any = {
        courseId: course._id,
        userId: user?._id,
      };
      newOrder(data, res, next);
      const mailData = {
        order: {
          _id: course?._id.slice(0, 6),
          name: course.name,
          price: course.price,
          data: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };
      // change accoring need
      // const html = await ejs.renderFile(
      //     path.join(__dirname, "../mails/activation-mail.ejs"),{
      //         order:data
      //     }
      //   );
      try {
        await sendMailer({
          email: user?.email ,
          subject: "Question Replay",
          template: "question-reply.ejs",
          data:mailData,
        });

      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
      user?.courses.push(course?._id);
      res.status(201).json({
        success: true,
        order,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
