"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Authentication_1 = require("./../middleware/Authentication");
var Paypal_Controller_1 = require("../controllers/Paypal.Controller");
var ValidateRequest_1 = __importDefault(require("../middleware/ValidateRequest"));
var Paypal_Schema_1 = require("../schema/Paypal.Schema");
var PaypalRoute = function (app) {
    app.get("/paypals", Authentication_1.VerifyLogin, Authentication_1.RequireStaff, Paypal_Controller_1.GetListPaypalHandler);
    app.post("/paypal/capture", Authentication_1.VerifyLogin, (0, ValidateRequest_1.default)(Paypal_Schema_1.CapturePaypalSchema), Paypal_Controller_1.CapturePaypalHandler);
    app.post("/paypal/price", Authentication_1.VerifyLogin, (0, ValidateRequest_1.default)(Paypal_Schema_1.GetPricePaypalSchema), Paypal_Controller_1.GetPricePaypalHandler);
    app.post("/paypal", Authentication_1.VerifyLogin, (0, ValidateRequest_1.default)(Paypal_Schema_1.CreatePaypalSchema), Paypal_Controller_1.CreatePaypalHandler);
    app.delete("/paypal/all", Paypal_Controller_1.DeleteAllPaypalHandler);
};
exports.default = PaypalRoute;
