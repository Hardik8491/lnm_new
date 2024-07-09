import express, { Router } from "express";
import { createStudent, deleteStudent, getAllStudents, getStudent, updateStudent } from "../controllers/student.controller";
const studentRouter = express.Router();

studentRouter.post("/add-student",createStudent);
studentRouter.put("/update-student",updateStudent);
studentRouter.get("/get-students",getAllStudents);
studentRouter.get("/get-student/:id",getStudent);
studentRouter.delete("/delete-student",deleteStudent);

export default studentRouter;