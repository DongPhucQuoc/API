"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAllPaypalHandler = exports.GetListPaypalHandler = exports.GetPricePaypalHandler = exports.CapturePaypalHandler = exports.CreatePaypalHandler = void 0;
var paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
var Order_Service_1 = require("./../services/Order.Service");
var Product_Service_1 = require("../services/Product.Service");
var Cart_Service_1 = require("../services/Cart.Service");
var User_Service_1 = require("../services/User.Service");
var Order_Controller_1 = require("./Order.Controller");
var Paypal_Service_1 = require("../services/Paypal.Service");
var OrderDetail_Service_1 = require("../services/OrderDetail.Service");
var Image_Service_1 = require("../services/Image.Service");
var getTotal = function (res, items) { return __awaiter(void 0, void 0, void 0, function () {
    var total, i, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                total = 0;
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < items.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, Product_Service_1.FindProduct)({
                        _id: items[i].product,
                    })];
            case 2:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(400).json({ message: "PRODUCT HAS NOT FOUND" })];
                }
                total +=
                    (product.price + (0, Cart_Service_1.GetPriceBySize)(items[i].size)) * items[i].quantity;
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, (Math.round((total / 23000) * 100) / 100).toFixed(2)];
        }
    });
}); };
var addNameIntoItems = function (res, items) { return __awaiter(void 0, void 0, void 0, function () {
    var result, i, product, item;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = [];
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < items.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, Product_Service_1.FindProduct)({
                        _id: items[i].product,
                    })];
            case 2:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(400).json({ message: "PRODUCT HAS NOT FOUND" })];
                }
                item = {
                    name: product.name,
                    price: (parseInt((product.price / 23000).toString()) + 1).toString(),
                    currency: "USD",
                    quantity: parseInt(items[i].quantity.toString()),
                };
                result.push(item);
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, result];
        }
    });
}); };
var CreatePaypalHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, orderID, infoGuest, orderDetails, order, priceDetails, total, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, User_Service_1.GetUserID)(req)];
            case 1:
                userID = _a.sent();
                orderID = req.body.orderID;
                infoGuest = req.body.infoGuest;
                orderDetails = req.body.orderDetails;
                return [4 /*yield*/, (0, Order_Service_1.CreateOrder)(__assign(__assign({}, req.body), { infoGuest: infoGuest, user: userID, shippedDate: new Date() }))];
            case 2:
                order = _a.sent();
                return [4 /*yield*/, (0, Order_Controller_1.CreateOrderDetailHandler)(orderDetails, order._id)];
            case 3:
                priceDetails = _a.sent();
                //@ts-ignore
                // const email = await SendMailOrder(orderID, req.user.email);
                // if (!email) {
                //   console.log("Can't send email");
                // }
                return [4 /*yield*/, (0, Paypal_Service_1.CreatePaypal)(__assign(__assign({}, req.body), { order: order._id, user: userID, paid: true }))];
            case 4:
                //@ts-ignore
                // const email = await SendMailOrder(orderID, req.user.email);
                // if (!email) {
                //   console.log("Can't send email");
                // }
                _a.sent();
                total = priceDetails + order.shipFee;
                return [4 /*yield*/, (0, Order_Service_1.UpdateOrder)({ _id: order._id }, { total: total }, { new: true })];
            case 5:
                result = _a.sent();
                result = __assign(__assign({}, order._doc), { orderID: orderID, orderDetails: __assign({}, orderDetails) });
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.CreatePaypalHandler = CreatePaypalHandler;
var CapturePaypalHandler = function (req, res) {
    var orderID = req.body.id;
    paypal_rest_sdk_1.default.payment.get(orderID, {}, function (error, payment) { });
};
exports.CapturePaypalHandler = CapturePaypalHandler;
var GetPricePaypalHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var items, total;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                items = req.body.list;
                return [4 /*yield*/, getTotal(res, items)];
            case 1:
                total = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: total })];
        }
    });
}); };
exports.GetPricePaypalHandler = GetPricePaypalHandler;
var GetListPaypalHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paypals, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Paypal_Service_1.GetListPaypal)({})];
            case 1:
                paypals = _a.sent();
                return [4 /*yield*/, BodyGetListOrderByListPaypal(res, paypals)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetListPaypalHandler = GetListPaypalHandler;
var BodyGetListOrderByListPaypal = function (res, paypals) { return __awaiter(void 0, void 0, void 0, function () {
    var result, i, orderID, order, orderDetails;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = [];
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < paypals.length)) return [3 /*break*/, 5];
                orderID = paypals[i].orderID;
                return [4 /*yield*/, (0, Order_Service_1.FindOrder)({ _id: paypals[i].order })];
            case 2:
                order = _a.sent();
                return [4 /*yield*/, BodyGetListProductByOrderDetails(res, paypals[i].order)];
            case 3:
                orderDetails = _a.sent();
                result = __spreadArray(__spreadArray([], result, true), [{ orderID: orderID, order: order, orderDetails: orderDetails }], false);
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/, result];
        }
    });
}); };
var BodyGetListProductByOrderDetails = function (res, orderID) { return __awaiter(void 0, void 0, void 0, function () {
    var result, i, product, images;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, OrderDetail_Service_1.GetListOrderDetails)({ order: orderID })];
            case 1:
                result = _a.sent();
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < result.length)) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, Product_Service_1.FindProduct)({ _id: result[i].product })];
            case 3:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({ message: "PRODUCT HAS NOT FOUND" })];
                }
                return [4 /*yield*/, (0, Image_Service_1.GetImagesByProductID)({
                        product: result[i].product,
                    })];
            case 4:
                images = _a.sent();
                result[i] = __assign(__assign({}, result[i]._doc), { product: __assign(__assign({}, product), { images: images }) });
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 2];
            case 6: return [2 /*return*/, result];
        }
    });
}); };
var DeleteAllPaypalHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Paypal_Service_1.DeleteAllPaypal)({})];
            case 1:
                _a.sent();
                return [2 /*return*/, res.sendStatus(200)];
        }
    });
}); };
exports.DeleteAllPaypalHandler = DeleteAllPaypalHandler;
