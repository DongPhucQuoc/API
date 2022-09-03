"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_Route_1 = __importDefault(require("./User.Route"));
var Product_Route_1 = __importDefault(require("./Product.Route"));
var Category_Route_1 = __importDefault(require("./Category.Route"));
var Cart_Route_1 = __importDefault(require("./Cart.Route"));
var Order_Route_1 = __importDefault(require("./Order.Route"));
var Image_Route_1 = __importDefault(require("./Image.Route"));
var Paypal_Route_1 = __importDefault(require("./Paypal.Route"));
var Statistic_Route_1 = __importDefault(require("./Statistic.Route"));
var Receipt_Route_1 = __importDefault(require("./Receipt.Route"));
var InitialRoute = function (app) {
    (0, User_Route_1.default)(app);
    (0, Product_Route_1.default)(app);
    (0, Category_Route_1.default)(app);
    (0, Cart_Route_1.default)(app);
    (0, Order_Route_1.default)(app);
    (0, Image_Route_1.default)(app);
    (0, Paypal_Route_1.default)(app);
    (0, Statistic_Route_1.default)(app);
    (0, Receipt_Route_1.default)(app);
};
exports.default = InitialRoute;
