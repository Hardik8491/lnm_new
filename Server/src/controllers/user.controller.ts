import { Request, Response, NextFunction } from "express";
import UserModel, { IUser } from "../models/user.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import path from "path";
import sendMailer from "../mails/sendMail";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
import redisClient from "../utils/redis";
import { getUserById } from "../services/user.service";
import userModel from "../models/user.model";
import exp from "constants";
dotenv.config();

// register user
interface IRegistrationBody {
  firstName: string;
  lastName: string;
  email:string;
  password: string;
  avatar?: string;
  role?: string;
}

export const registrationUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { firstName ,lastName, email, password }: IRegistrationBody = req.body;
      const isEmailExist = await UserModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email already exists", 400));
      }
      const user: IRegistrationBody = {
        firstName,
        lastName,
        email,
        password,
      };
      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;
      const data = { user: { firstName,lastName, email }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      ); // create email template

      try {
        await sendMailer({
          email,
          subject: "Account Activation",
          template: "activation-mail.ejs",
          data: { firstName,lastName,email, activationCode },
        });
        res.status(201).json({
          success: true,
          message: "Account activation email has been sent to your email",
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );
  return { token, activationCode };
};

// activate user
interface IActivationRequest {
  activationCode: string;
  activationToken: string;
}

export const activationUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activationCode, activationToken }: IActivationRequest = req.body;
      const decoded = jwt.verify(
        activationToken,
        process.env.ACTIVATION_SECRET as Secret
      ) as { user: IUser; activationCode: string };

      if (activationCode !== decoded.activationCode) {
        return next(new ErrorHandler("Invalid activation code", 400));
      }
      console.log(decoded.user);

      const { firstName,lastName, email, password } = decoded.user;
      // if (!name || !email || !password) {
      //   return next(new ErrorHandler("Invalid activation token", 400));
      // }
      const existUser = await UserModel.findOne({ email });
      if (existUser) {
        return next(new ErrorHandler("User already exists", 400));
      }

      const user = await UserModel.create(decoded.user);

      res.status(201).json({
        success: true,
        message: "Account has been activated",
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// login user
interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password }: ILoginRequest = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
      }

      const user = await UserModel.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }
      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }

      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// logout user
export const logoutUser = CatchAsyncError(
  (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("access_token", { maxAge: 1 });
      res.clearCookie("refresh_token", { maxAge: 1 });
      const userId = req.user?._id || "";
      redisClient.del(userId as string);
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
// update access token
export const updateAccessToken = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      const decode = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;
      const message = "Could not refresh token";
      if (!decode) {
        return next(new ErrorHandler(message, 404));
      }

      const session = await redisClient.get(decode.id as string);
      if (!session) {
        return next(new ErrorHandler(message, 400));
      }
      const user = JSON.parse(session);
      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        {
          expiresIn: "5m",
        }
      );
      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        {
          expiresIn: "3d",
        }
      );
      // Upload session to redis
      req.user = user;
      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);
      res.status(200).json({
        status: "success",
        accessToken,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get user info
export const getUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id as string;
      getUserById(userId, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
interface ISocialAuthBody {
  email: string;
  name: string;
  avatar: string;
}

// social auth
export const socialAuth = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, avatar } = req.body as ISocialAuthBody;
      const user = await userModel.findOne({ email });
      if (!user) {
        const newUser = await userModel.create({ email, name, avatar });
        sendToken(newUser, 200, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// login user
interface IUpdateUserInfo {
  email?: string;
  firstName?: string;
  lastName?: string;
}

export const updateUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { firstName,lastName, email } = req.body as IUpdateUserInfo;
      const userId = req.user?._id as string;
      const user = await userModel.findById(userId);
      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }
      if (email && user) {
        const isEmailExist = await UserModel.findOne({ email });
        if (isEmailExist) {
          return next(new ErrorHandler("Email already exists", 400));
        }
        user.email = email;
      }
      if (firstName && lastName && user) {
        user.firstName = firstName;
        user.lastName = lastName;
      }

      await user?.save();
      await redisClient.set(userId, JSON.stringify(user));

      res.status(201).json({
        success: true,
        message: "User info updated successfully",
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update user password
interface IUpdatePassword {
  currentPassword: string;
  newPassword: string;
}

export const updateUserPassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { currentPassword, newPassword }: IUpdatePassword = req.body;
      if (!currentPassword || !newPassword) {
        return next(new ErrorHandler("Please enter all fields", 400));
      }

      const user = await UserModel.findById(req.user?._id).select("+password");
      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      if (user.password == undefined) {
        return next(new ErrorHandler("Invalid old password", 400));
      }

      const isPasswordMatch = await user.comparePassword(currentPassword);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid password", 400));
      }
      user.password = newPassword;
      await user.save();
      await redisClient.set(user._id as string, JSON.stringify(user));

      res.status(201).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update profile picture
interface IUpdateProfilePicture {
  avatar: string;
}
export const updateProfilePicture = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar }: IUpdateProfilePicture = req.body;

      const userId = req.user?._id;
      const user = await UserModel.findById(userId);

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }
      if (avatar && user) {
        // if user have one avar then call this if
        if (user.avatar?.public_id) {
          const image_id = user.avatar.public_id;
          // first delete the old images
          await cloudinary.v2.uploader.destroy(image_id);
          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
          });
        } else {
          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
          });
          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }

      await user.save();
      await redisClient.set(userId as string, JSON.stringify(user));

      res.status(201).json({
        success: true,
        message: "Profile picture updated successfully",
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
