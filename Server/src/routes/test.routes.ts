import express, { Router } from "express";
import {
  createTest,
  deleteTest,
  getTest,
  getTestById,
} from "../controllers/test.controller";

const testRouter = express.Router();

testRouter.post("/create-tests", createTest);
testRouter.get("/get-tests", getTest);
testRouter.delete("/delete-test", deleteTest);
testRouter.get("/get-test/:id", getTestById);

export default testRouter;
