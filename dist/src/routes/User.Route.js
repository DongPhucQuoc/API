"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Authentication_1 = require("./../middleware/Authentication");
var User_Controller_1 = require("./../controllers/User.Controller");
var User_Controller_2 = require("../controllers/User.Controller");
var User_Controller_3 = require("../controllers/User.Controller");
var Authentication_2 = require("../middleware/Authentication");
var ValidateRequest_1 = __importDefault(require("../middleware/ValidateRequest"));
var User_Schema_1 = require("../schema/User.Schema");
var UserRoute = function (app) {
    app.get("/profile", Authentication_2.VerifyLogin, User_Controller_3.GetProfileUserHandler);
    app.post("/user", (0, ValidateRequest_1.default)(User_Schema_1.CreateUserSchema), User_Controller_3.CreateUserHandler);
    app.post('/admin', (0, ValidateRequest_1.default)(User_Schema_1.CreateUserSchema), User_Controller_1.CreateAdminHandler);
    app.post("/staff", Authentication_2.VerifyLogin, Authentication_1.RequireAdmin, (0, ValidateRequest_1.default)(User_Schema_1.CreateUserSchema), User_Controller_1.CreateStaffHandler);
    app.post("/login", Authentication_2.CreateToken);
    app.post("/forgot-password", (0, ValidateRequest_1.default)(User_Schema_1.ForgotPasswordSchema), User_Controller_3.ForgotPasswordHandler);
    app.put("/profile", Authentication_2.VerifyLogin, User_Controller_3.UpdateProfileUserHandler);
    app.put("/change-password", Authentication_2.VerifyLogin, (0, ValidateRequest_1.default)(User_Schema_1.ChangePasswordUserSchema), User_Controller_2.ChangePasswordUserHandler);
};
exports.default = UserRoute;
