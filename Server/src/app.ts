import express, { NextFunction, Request, Response } from "express";
import env from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.routes";
import courseRouter from "./routes/course.routes";
import studentRouter from "./routes/student.routes";
import testRouter from "./routes/test.routes";
import responseRouter from "./routes/response.routes";
// export app
export const app = express();

// body-parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// cors
app.use(
  cors({
    origin:process.env.ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// testing route

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  try {
    const test = req.cookies.test;
    console.log(req);
    
    console.log(test);
    
    return res.status(200).json({ message: "Request Send", success: true,cookies:test });
  } catch (error) {
    res.send(error);
  }
});

// routes
app.use("/api/v1/", userRouter, studentRouter, courseRouter, testRouter,responseRouter);

//unknown routes
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`) as any;
  error.status = 404;
  next(error);
});



app.use(ErrorMiddleware);
