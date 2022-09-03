import { Request, Response } from "express";
import { omit } from "lodash";
import {
  ComparePassword,
  CreateUser,
  FindUser,
  GetUserID,
  HashPassword,
  UpdateUser,
  ForgotPassword,
} from "../services/User.Service";
import Common from "../utils/Common";

export const CreateUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await CreateUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (e) {
    console.log(e)
    return res.sendStatus(409);
  }
};

export const CreateStaffHandler = async (req: Request, res: Response) => {
  await CreateUser({ ...req.body, role: "staff" });
  return res.status(200).json({ message: "SUCCESSFUL" });
};

export const GetProfileUserHandler = async (req: Request, res: Response) => {
  //@ts-ignore
  const email = req.user.email;

  const result = await FindUser({ email });

  if (!result) {
    return res.status(404).json({ message: "USER HAS NOT FOUND" });
  }

  return res.status(200).json({ result });
};

export const UpdateProfileUserHandler = async (req: Request, res: Response) => {
  try {
    const userID = await GetUserID(req);
    const user = await FindUser({ _id: userID });
    if (!user) {
      return res.status(404).json({ message: "USER HAS NOT FOUND" });
    }

    const result = await UpdateUser({ _id: userID }, req.body, { new: false });
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const ChangePasswordUserHandler = async (
  req: Request,
  res: Response
) => {
  const hash = await HashPassword(req.body.password);
  const userID = await GetUserID(req);

  const user = FindUser({ _id: userID, password: hash });
  if (!user) {
    return res.status(400).json({ message: "PASSWORD IS NOT MATCHES" });
  }

  const newPassword: string = req.body.newPassword;
  const cNewPassword: string = req.body.cNewPassword;

  const check = ComparePassword(newPassword, cNewPassword);
  if (!check) {
    return res
      .status(400)
      .json({ message: "NEW PASSWROD AND NEW PASSWORD CONFIRM AREN'T MATCH" });
  }

  const hashNewPassword = await HashPassword(newPassword);
  await UpdateUser(
    { _id: userID },
    { password: hashNewPassword },
    { new: false }
  );

  return res.status(200).json({ message: "SUCCESSFUL" });
};

export const ForgotPasswordHandler = async (req: Request, res: Response) => {
  const email = req.body.email;
  const user = await FindUser({ email: email });
  if (!user) {
    return res.status(404).json({ message: "USER HAS NOT FOUND " });
  }

  const result = await ForgotPassword(email);
  return res.status(200).json({ result });
};

export const CreateAdminHandler = async (req: Request, res: Response) => {
  try {
    const admin = await CreateUser({ ...req.body, role: Common.role.ADMIN});
    return res.send(omit(admin.toJSON(), "password"));
  } catch (e) {
    return res.sendStatus(409);
  }
}