import { NextFunction, Request, Response } from "express";
import studentModel, { IStudent } from "../models/student.model";
import testModel from "../models/test.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { log } from "console";// Assuming models are in '../models'

export const createStudent = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data=req.body;
      console.log("data",req.body);
      
      const newStudent = new studentModel(req.body as IStudent);k
    
      const response=await newStudent.save();
      console.log("response",response);
      res.status(201).json({newStudent,success:true});
      location.reload();
      
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
// function to get a student by ID

export const getStudent = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.id;
    try {
      const student = await studentModel.findById(studentId);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json(student);
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
// Function to update an existing student by ID
export const updateStudent = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.id;
    const updates = req.body;

    try {
      const updatedStudent = await studentModel.findByIdAndUpdate(
        studentId,
        updates,
        {
          new: true,
        }
      );
      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json(updatedStudent);
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// Function to delete a student by ID
export const deleteStudent = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // const studentId = req.params.id;
    const studentId = req.body.id;
    try {
      const deletedStudent = await studentModel.findByIdAndDelete(studentId);
      if (!deletedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json({ message: "Student deleted successfully",success:true });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// Function to get all students
export const getAllStudents = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const students = await studentModel.find();
      res.status(200).json({ success: true, students });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// Function to enroll a student in a test (participation)
export const participateInTest = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.studentId;
    const testId = req.params.testId;

    try {
      const student = await studentModel.findById(studentId);
      const test = await testModel.findById(testId);

      if (!student || !test) {
        return res
          .status(404)
          .json({ success: true, message: "Student or test not found" });
      }

      // Check if student already participated (optional logic)
      const alreadyParticipated = student.tests?.includes(testId as any);
      if (alreadyParticipated) {
        return res
          .status(400)
          .json({
            success: true,
            message: "Student already participated in this test",
          });
      }

      student.tests?.push(testId as any);
      await student.save();

      res
        .status(200)
        .json({ success: true, message: "Student participation recorded" });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// Function to retrieve a student's performance in a test
export const getStudentTestPerformance = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.studentId;
    const testId = req.params.testId;

    try {
      const student = await studentModel.findById(studentId).populate("tests");
      const test = student?.tests?.find(
        (t: any) => (t?._id as any).toString() === testId
      );

      if (!student || !test) {
        return res.status(404).json({ message: "Student or test not found" });
      }

      // Access and process performance data from the test object (replace with your logic)
      const performanceData = {
        // ... extract relevant data from test object (e.g., marks, grades)
      };

      res.status(200).json(performanceData);
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
