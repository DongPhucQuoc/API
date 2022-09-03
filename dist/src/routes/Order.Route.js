"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Order_Controller_1 = require("../controllers/Order.Controller");
var Authentication_1 = require("../middleware/Authentication");
var ValidateRequest_1 = __importDefault(require("../middleware/ValidateRequest"));
var Order_Schema_1 = require("../schema/Order.Schema");
var OrderRoute = function (app) {
    app.get("/order", Authentication_1.VerifyLogin, Order_Controller_1.GetListOrderOfOneHandler);
    app.get("/orders/:page", Authentication_1.VerifyLogin, Authentication_1.RequireStaff, Order_Controller_1.GetListOrderHandler);
    app.get("/orders/tracking/:status", Authentication_1.VerifyLogin, Order_Controller_1.GetListOrderTrackingByStatusHandler);
    app.get("/orders/status/:status", Authentication_1.VerifyLogin, Authentication_1.RequireStaff, Order_Controller_1.GetListOrderByStatusHandler);
    app.get("/order/sorted", Authentication_1.VerifyLogin, Authentication_1.RequireStaff);
    app.post("/order", Authentication_1.VerifyLogin, (0, ValidateRequest_1.default)(Order_Schema_1.CreateOrderSchema), Order_Controller_1.CreateOrderHandler);
    app.post("/order/cancel/:id", Authentication_1.VerifyLogin, Order_Controller_1.CancelOrderHandler);
    app.post("/order/confirm/:id", Authentication_1.VerifyLogin, Authentication_1.RequireStaff, Order_Controller_1.ConfirmOrderHandler);
    app.post("/order/update/:id", Authentication_1.VerifyLogin, Authentication_1.RequireStaff, Order_Controller_1.UpdateStatusOrderHandler);
    app.post("/order/paid/:id", Authentication_1.VerifyLogin, Authentication_1.RequireStaff, Order_Controller_1.SetOrderIsPaidHandler);
    app.post("/order/sorted", Authentication_1.VerifyLogin, Authentication_1.RequireStaff, (0, ValidateRequest_1.default)(Order_Schema_1.GetListOrderSortedSchema), Order_Controller_1.GetListOrderSortedHander);
    app.delete("/order/all", Order_Controller_1.DeleteAllOrderHandler);
};
exports.default = OrderRoute;
