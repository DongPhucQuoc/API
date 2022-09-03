"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Image_Middleware_1 = __importDefault(require("../middleware/Image.Middleware"));
var Authentication_1 = require("../middleware/Authentication");
var Image_Controller_1 = require("../controllers/Image.Controller");
var ImageRoute = function (app) {
    app.post("/image/:idProduct", Authentication_1.VerifyLogin, Authentication_1.RequireStaff, Image_Middleware_1.default.single("image"), Image_Controller_1.SaveImageHandler);
    app.put("/image/:idProduct", Authentication_1.VerifyLogin, Authentication_1.RequireStaff, Image_Middleware_1.default.single("image"), Image_Controller_1.UpdateImageHandler);
};
exports.default = ImageRoute;
