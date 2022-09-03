import { RequireAdmin } from "./../middleware/Authentication";
import { CreateAdminHandler, CreateStaffHandler } from "./../controllers/User.Controller";
import { ChangePasswordUserHandler } from "../controllers/User.Controller";
import { Express } from "express";
import {
  CreateUserHandler,
  GetProfileUserHandler,
  UpdateProfileUserHandler,
  ForgotPasswordHandler,
} from "../controllers/User.Controller";
import { CreateToken, VerifyLogin } from "../middleware/Authentication";
import ValidateRequest from "../middleware/ValidateRequest";
import {
  ChangePasswordUserSchema,
  CreateUserSchema,
  ForgotPasswordSchema,
} from "../schema/User.Schema";

const UserRoute = (app: Express) => {
  app.get("/profile", VerifyLogin, GetProfileUserHandler);

  app.post("/user", ValidateRequest(CreateUserSchema), CreateUserHandler);
  app.post('/admin', ValidateRequest(CreateUserSchema), CreateAdminHandler);
  app.post(
    "/staff",
    VerifyLogin,
    RequireAdmin,
    ValidateRequest(CreateUserSchema),
    CreateStaffHandler
  );
  app.post("/login", CreateToken);
  app.post(
    "/forgot-password",
    ValidateRequest(ForgotPasswordSchema),
    ForgotPasswordHandler
  );

  app.put("/profile", VerifyLogin, UpdateProfileUserHandler);
  app.put(
    "/change-password",
    VerifyLogin,
    ValidateRequest(ChangePasswordUserSchema),
    ChangePasswordUserHandler
  );
};

export default UserRoute;
