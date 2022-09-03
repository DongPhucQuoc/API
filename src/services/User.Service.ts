import { omit } from "lodash";
import { Request } from "express";
import bcrypt from "bcrypt";
import config from "../../config/Default";
import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import User, { UserDocument } from "../models/User.Model";
import { v4 as uuid } from "uuid";
import nodemailer from "nodemailer";

export const CreateUser = async (input: DocumentDefinition<UserDocument>) => {
  try {
    return await User.create(input);
  } catch (e) {
    console.log(e)
    throw new Error("Error create user");
  }
};

export const ValidatePassword = async ({
  email,
  password,
}: {
  email: UserDocument["email"];
  password: string;
}) => {
  console.log("emialemialemialemialemialemialemial", email)
  const user = await User.findOne({ email });
  console.log("useruseruseuseruseruserr", user)
  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
};

export const FindUser = async (query: FilterQuery<UserDocument>) => {
  return await User.findOne(query);
};

export const UpdateUser = async (
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions
) => {
  return await User.findOneAndUpdate(query, update, options);
};

export const GetUserID = async (req: any) => {
  const email = req.user.email;
  const user = await FindUser({ email });
  const userID = user?._id;
  return userID;
};

export const GetRoleUserLogined = async (req: Request) => {
  const userID = await GetUserID(req);
  const user = await FindUser({ _id: userID });
  if (!user) {
    return null;
  }
  return user.role;
};

export const HashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(config.saltHashPassword);
  return bcrypt.hashSync(password, salt);
};

export const ComparePassword = (newPassword: string, cNewPassword: string) => {
  if (newPassword !== cNewPassword) {
    return false;
  }

  return true;
};

export const ForgotPassword = async (to: string) => {
  try {
    const newPassword = uuid();
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 465,
      secure: false,
      auth: {
        user: config.mailUsername,
        pass: config.mailPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: config.mailUsername,
      to: to,
      subject: "Forgot password from FASTFOOD SHOP",
      text: "New password is: " + newPassword,
    };

    const hashPassword = await HashPassword(newPassword);
    await UpdateUser(
      { email: to },
      { password: hashPassword },
      { new: false }
    );
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error)
  }
};
