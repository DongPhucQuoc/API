"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Cart_Controller_1 = require("../controllers/Cart.Controller");
var Cart_Controller_2 = require("../controllers/Cart.Controller");
var Authentication_1 = require("../middleware/Authentication");
var ValidateRequest_1 = __importDefault(require("../middleware/ValidateRequest"));
var Cart_Schema_1 = require("../schema/Cart.Schema");
var CartRoute = function (app) {
    app.get("/carts", Cart_Controller_2.GetAllCartHandler);
    app.get("/carts/quantity", Cart_Controller_2.GetCartQuantityHandler);
    app.post("/cart/price", (0, ValidateRequest_1.default)(Cart_Schema_1.GetCartPriceSelectedSchema), Cart_Controller_2.GetCartPriceSelectedHandler);
    app.post("/cart", (0, ValidateRequest_1.default)(Cart_Schema_1.CreateCartSchema), Cart_Controller_2.CreateCartHandler);
    app.post("/cart/delete/list", Authentication_1.VerifyLogin, (0, ValidateRequest_1.default)(Cart_Schema_1.DeleteListCartByID), Cart_Controller_1.DeleteListCartByIDHandler);
    app.put("/cart", (0, ValidateRequest_1.default)(Cart_Schema_1.UpdateCartSchema), Cart_Controller_1.UpdateCartByIDHander);
    app.delete("/cart/:id", Cart_Controller_2.DeleteCartByIDHandler);
    app.delete("/cart/all", Authentication_1.VerifyLogin, Cart_Controller_2.DeleteAllCartHandler);
};
exports.default = CartRoute;
