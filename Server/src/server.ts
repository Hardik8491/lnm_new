import { app } from "./app";
import dotenv from "dotenv";
import connectDB from "./utils/db";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});
// create server
app.listen(process.env.PORT, () => {
  try {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
    connectDB();
  } catch (error) {
    console.log(error);
    return error;
  }
});
