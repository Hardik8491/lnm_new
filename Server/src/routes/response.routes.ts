import express, { Router } from "express";
import {
  CreateResponseRequest,
  DeleteResponseRequest,
  GetResponseRequest,
} from "../controllers/response.controller";

const responseRouter = express.Router();

responseRouter.post("/create-response", CreateResponseRequest);
responseRouter.get("/get-response", GetResponseRequest);
responseRouter.delete("/delete-response", DeleteResponseRequest);

export default responseRouter;
