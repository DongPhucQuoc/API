"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Receipt_Controller_1 = require("./../controllers/Receipt.Controller");
var Authentication_1 = require("./../middleware/Authentication");
var Authentication_2 = require("../middleware/Authentication");
var Receipt_Controller_2 = require("../controllers/Receipt.Controller");
var ValidateRequest_1 = __importDefault(require("../middleware/ValidateRequest"));
var Receipt_Schema_1 = require("../schema/Receipt.Schema");
var ReceiptRoute = function (app) {
    app.get("/receipt", Receipt_Controller_2.GetListReceiptHandler);
    app.get("/receipt/:id", Receipt_Controller_1.GetReceiptByIDHandler);
    app.post("/receipt", Authentication_2.VerifyLogin, Authentication_1.RequireStaff, (0, ValidateRequest_1.default)(Receipt_Schema_1.CreateReceiptSchema), Receipt_Controller_2.CreateReceiptHandler);
    app.put("/receipt/:id", Authentication_2.VerifyLogin, Authentication_1.RequireStaff, (0, ValidateRequest_1.default)(Receipt_Schema_1.CreateReceiptSchema), Receipt_Controller_2.UpdateReceiptHandler);
    app.delete("/receipt/:id", Authentication_2.VerifyLogin, Authentication_1.RequireStaff, Receipt_Controller_2.DeleteReceiptHandler);
};
exports.default = ReceiptRoute;
