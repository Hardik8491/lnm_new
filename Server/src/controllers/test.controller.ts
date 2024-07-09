import { NextFunction, Request, Response } from "express";
import studentModel, { IStudent } from "../models/student.model";
import testModel from "../models/test.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import exp from "constants";

export const createTest = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newTest = new testModel(req.body);
      await newTest.save();
      res.status(201).json(newTest);
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
export const getTest = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tests = await testModel.find();
      return res.status(200).json({ tests, success: true });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
export const getTestById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const testId = req.params.id;
    console.log(testId);
    
    try {
  
      const test=await testModel.findById(testId);
      console.log(testId);
      
      if(!test){
        return res.status(404).json({success:false,message:"Test not found"});
      }
      res.status(200).json({test,success:true});
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }});

export const deleteTest = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const testId = req.body.id;
    console.log(testId);
    
    try {
      const deletedTest = await testModel.findByIdAndDelete(testId);
      console.log(deletedTest);
      
      if (!deletedTest) {
        return res.status(404).json({ success:false,message: "Test not found" });
      }
      res.status(200).json({ success:true,message: "Test deleted successfully" });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
