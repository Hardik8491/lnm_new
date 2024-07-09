import { NextFunction, Request, Response } from "express";
import studentModel, { IStudent } from "../models/student.model";
import testModel from "../models/test.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import responseModel from "../models/response.model";

interface CreateResponseRequest extends Request {
  body: {
    studentId: string;
    userId?: string; // Optional
    question?: AnsweredQuestion[];
    testId: string;
    submittedDate: Date;
  };
}

interface AnsweredQuestion {
  question: {
    text: string;
    type: string; // e.g., "multiple_choice", "open_ended"
    skill: string; // Skill associated with the question
    answer: string | string[]; // Single string for open-ended, array of strings for multiple-choice
  };
}

export const CreateResponseRequest = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { studentId, userId, questions, submittedDate, testId } = req.body;
      const newResponse = new responseModel({
        studentId,
        userId,
        questions,
        submittedDate: new Date(submittedDate),
        testId,
      });

      await newResponse.save();
      res.status(201).send({response:newResponse,message:"Response saved successfully", success:true});
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

export const GetResponseRequest = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const responseId = req.body.id;
      const Response = await responseModel.findById(responseId);

      res.status(201).json({
        Response,
        message: "Response created successfully!",
        success: true,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

export const DeleteResponseRequest = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const responseId = req.body.id;
      const Response = await responseModel.findByIdAndDelete(responseId);

      if (!Response) {
        return next(new ErrorHandler("Not found response!", 404));
      }
      res.status(201).json({
        message: "Response deleted successfully!",
        success: true,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
