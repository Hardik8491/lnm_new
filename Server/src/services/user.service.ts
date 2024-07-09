// get user by id

import userModel from "../models/user.model";
import { Response } from "express";
import redisClient from "../utils/redis";

export const getUserById = async (id: string, res: Response) => {
  console.log("id is:-",id);
  
  const userJson = await redisClient.get(id);
  console.log("userJson is:-",userJson);

  
  if (userJson) {
    const user = JSON.parse(userJson as string);
    console.log("user is:-",user);
    
    return res.status(200).json({ success: true, user });
  }else{
    return res.status(404).json({ success: false, message: "user not found" });
  }
};
