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
exports.DeleteAllOrderHandler = exports.DecrementQuantityStock = exports.CreateOrderDetailHandler = exports.UpdateStatusOrderHandler = exports.CancelOrderHandler = exports.GetListOrderSortedHander = exports.SetOrderIsPaidHandler = exports.ConfirmOrderHandler = exports.GetListOrderByStatusHandler = exports.GetListOrderTrackingByStatusHandler = exports.GetListOrderOfOneHandler = exports.GetListOrderSortedHandler = exports.GetListOrderHandler = exports.CreateOrderHandler = void 0;
var Image_Service_1 = require("../services/Image.Service");
var OrderDetail_Service_1 = require("../services/OrderDetail.Service");
var Order_Service_1 = require("../services/Order.Service");
var User_Service_1 = require("../services/User.Service");
var Common_1 = __importDefault(require("../utils/Common"));
var lodash_1 = require("lodash");
var Product_Service_1 = require("../services/Product.Service");
var Cart_Service_1 = require("../services/Cart.Service");
var Category_Service_1 = require("../services/Category.Service");
var Receipt_Service_1 = require("../services/Receipt.Service");
var CreateOrderHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, order, orderID, dataOrderDetails, provider, priceDetails, total, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, User_Service_1.GetUserID)(req)];
            case 1:
                userID = _a.sent();
                return [4 /*yield*/, (0, Order_Service_1.CreateOrder)(__assign(__assign({}, req.body), { user: userID }))];
            case 2:
                order = _a.sent();
                orderID = order._id;
                dataOrderDetails = req.body.orderDetails;
                return [4 /*yield*/, (0, exports.DecrementQuantityStock)(dataOrderDetails)];
            case 3:
                provider = _a.sent();
                if (!provider) {
                    return [2 /*return*/, res.status(400).json({ message: "NOT ENOUGH MATERIAL" })];
                }
                return [4 /*yield*/, (0, exports.CreateOrderDetailHandler)(dataOrderDetails, orderID)];
            case 4:
                priceDetails = _a.sent();
                total = priceDetails + order.shipFee;
                return [4 /*yield*/, (0, Order_Service_1.UpdateOrder)({ _id: orderID }, { total: total }, { new: true })];
            case 5:
                result = _a.sent();
                //@ts-ignore
                result = __assign(__assign({}, order._doc), { orderDetails: __assign({}, dataOrderDetails) });
                //@ts-ignore
                // const email = await SendMailOrder(orderID, req.user.email);
                // if (!email) {
                //   console.log("Can't send email");
                // }
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.CreateOrderHandler = CreateOrderHandler;
var GetLengthOrders = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Order_Service_1.GetListOrder)({})];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result.length];
        }
    });
}); };
var GetListOrderHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, skip, listOrders, length, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = (0, lodash_1.get)(req, "params.page");
                if (page < 1) {
                    return [2 /*return*/, res.status(400).json({ message: "PAGE MUST BE BIGGER THEN 0 " })];
                }
                skip = (parseInt(page) - 1) * 6;
                return [4 /*yield*/, (0, Order_Service_1.GetListOrderWithPage)({}, skip, 6)];
            case 1:
                listOrders = _a.sent();
                if (!listOrders) {
                    return [2 /*return*/, res.status(404).json({ message: "NO ORDERS HAVE FOUND" })];
                }
                return [4 /*yield*/, GetLengthOrders()];
            case 2:
                length = _a.sent();
                return [4 /*yield*/, BodyGetListOrder(res, listOrders)];
            case 3:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result, length: length })];
        }
    });
}); };
exports.GetListOrderHandler = GetListOrderHandler;
var GetListOrderSortedHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
exports.GetListOrderSortedHandler = GetListOrderSortedHandler;
var GetListOrderOfOneHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, listOrderIDs, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, User_Service_1.GetUserID)(req)];
            case 1:
                userID = _a.sent();
                return [4 /*yield*/, (0, Order_Service_1.GetListOrderID)({ user: userID })];
            case 2:
                listOrderIDs = _a.sent();
                if (!listOrderIDs || listOrderIDs.length === 0) {
                    return [2 /*return*/, res.status(404).json({ message: "LIST ORDERS HAVE NOT FOUND" })];
                }
                return [4 /*yield*/, BodyGetListOrderForUser(listOrderIDs)];
            case 3:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetListOrderOfOneHandler = GetListOrderOfOneHandler;
var GetListOrderTrackingByStatusHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status, userID, listOrderIDs, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = (0, lodash_1.get)(req, "params.status");
                if (!status) {
                    return [2 /*return*/, res.status(400).json({ message: "ORDER STATUS IS REQUIRED" })];
                }
                return [4 /*yield*/, (0, User_Service_1.GetUserID)(req)];
            case 1:
                userID = _a.sent();
                return [4 /*yield*/, (0, Order_Service_1.GetListOrderID)({ user: userID, status: status })];
            case 2:
                listOrderIDs = _a.sent();
                if (!listOrderIDs) {
                    return [2 /*return*/, res.status(404).json({ message: "LIST ORDER IS EMPTY" })];
                }
                return [4 /*yield*/, BodyGetListOrderForUser(listOrderIDs)];
            case 3:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetListOrderTrackingByStatusHandler = GetListOrderTrackingByStatusHandler;
var GetListOrderByStatusHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status, listOrders, arrOrders, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = (0, lodash_1.get)(req, "params.status");
                if (!status) {
                    return [2 /*return*/, res.status(400).json({ message: "STATUS IS REQUIRED" })];
                }
                return [4 /*yield*/, (0, Order_Service_1.GetListOrder)({ status: status })];
            case 1:
                listOrders = _a.sent();
                if (!listOrders) {
                    return [2 /*return*/, res.status(404).json({ message: "NO ORDERS HAVE FOUND" })];
                }
                arrOrders = Object.values(listOrders);
                return [4 /*yield*/, BodyGetListOrderForUser(arrOrders)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetListOrderByStatusHandler = GetListOrderByStatusHandler;
var ConfirmOrderHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderID, order, orderStatus, EditerLogined, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderID = (0, lodash_1.get)(req, "params.id");
                if (!orderID) {
                    return [2 /*return*/, res.status(400).json({ message: "ID ORDER IS REQUIRED" })];
                }
                return [4 /*yield*/, (0, Order_Service_1.FindOrder)({ _id: orderID })];
            case 1:
                order = _a.sent();
                if (!order) {
                    return [2 /*return*/, res.status(404).json({ message: "ORDER HAS NOT FOUND" })];
                }
                orderStatus = order.status;
                if (orderStatus !== Common_1.default.status.UNCONFIRMED) {
                    return [2 /*return*/, res.status(400).json({ message: "CAN'T UPDATE STATUS THIS ORDER" })];
                }
                return [4 /*yield*/, (0, User_Service_1.GetUserID)(req)];
            case 2:
                EditerLogined = _a.sent();
                return [4 /*yield*/, (0, Order_Service_1.UpdateOrder)({ _id: orderID }, { status: Common_1.default.status.WAITING, updatedBy: EditerLogined }, { new: false })];
            case 3:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.ConfirmOrderHandler = ConfirmOrderHandler;
var SetOrderIsPaidHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderID, order, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderID = (0, lodash_1.get)(req, "params.id");
                if (!orderID) {
                    return [2 /*return*/, res.status(400).json({ message: "ID ORDER IS REQUIRED" })];
                }
                return [4 /*yield*/, (0, Order_Service_1.FindOrder)({ _id: orderID })];
            case 1:
                order = _a.sent();
                if (!order) {
                    return [2 /*return*/, res.status(404).json({ message: "ORDER HAS NOT FOUND" })];
                }
                return [4 /*yield*/, (0, Order_Service_1.UpdateOrder)({ _id: orderID }, { paid: true, shippedDate: new Date() }, { new: false })];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.SetOrderIsPaidHandler = SetOrderIsPaidHandler;
var GetListOrderSortedHander = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var type, page, skip, by, list, length;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                type = req.body.type;
                page = req.body.page;
                skip = (parseInt(page) - 1) * 6;
                if (!(0, Order_Service_1.TypeIsSuitable)(type)) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "TYPE IS 'INCREMENT' OR 'DECREMENT'" })];
                }
                by = (0, Order_Service_1.GetTypeSort)(type);
                return [4 /*yield*/, (0, Order_Service_1.GetListOrderSorted)(by, skip, 6)];
            case 1:
                list = _a.sent();
                if (!list) {
                    return [2 /*return*/, res.status(404).json({ message: "NO ORDERS HAVE BEEN FOUND" })];
                }
                return [4 /*yield*/, GetLengthOrders()];
            case 2:
                length = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: list, length: length })];
        }
    });
}); };
exports.GetListOrderSortedHander = GetListOrderSortedHander;
var CancelOrderHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderID, order, result, orderDetails, i, product, receipt, quantityStock;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderID = (0, lodash_1.get)(req, "params.id");
                if (!orderID) {
                    return [2 /*return*/, res.status(400).json({ message: "ID ORDER IS REQUIRED" })];
                }
                return [4 /*yield*/, (0, Order_Service_1.FindOrder)({ _id: orderID })];
            case 1:
                order = _a.sent();
                if (!order) {
                    return [2 /*return*/, res.status(404).json({ message: "ORDER HAS NOT FOUND" })];
                }
                if (order.status != Common_1.default.status.WAITING &&
                    order.status != Common_1.default.status.SHIPPING) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({
                            message: "CAN'T CANCEL THIS ORDER",
                            status: order.status,
                            status2: Common_1.default.status.SHIPPING,
                        })];
                }
                return [4 /*yield*/, (0, Order_Service_1.UpdateOrder)({ _id: orderID }, { status: Common_1.default.status.CANCELED }, { new: false })];
            case 2:
                result = _a.sent();
                return [4 /*yield*/, (0, OrderDetail_Service_1.GetListOrderDetails)({ order: orderID })];
            case 3:
                orderDetails = _a.sent();
                i = 0;
                _a.label = 4;
            case 4:
                if (!(i < orderDetails.length)) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, Product_Service_1.FindProduct)({ _id: orderDetails[i].product })];
            case 5:
                product = _a.sent();
                return [4 /*yield*/, (0, Receipt_Service_1.FindReceipt)({ category: product.category })];
            case 6:
                receipt = _a.sent();
                quantityStock = GamMake(orderDetails[i].size) * parseInt(orderDetails[i].quantity) +
                    parseInt(receipt.quantityStock);
                return [4 /*yield*/, (0, Receipt_Service_1.UpdateReceipt)({ _id: receipt._id }, { quantityStock: quantityStock }, { new: false })];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                i++;
                return [3 /*break*/, 4];
            case 9: return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.CancelOrderHandler = CancelOrderHandler;
var UpdateStatusOrderHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderID, order, statusUpdated, EditerLogined, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderID = (0, lodash_1.get)(req, "params.id");
                if (!orderID) {
                    return [2 /*return*/, res.status(400).json({ message: "ID ORDER IS REQUIRED" })];
                }
                return [4 /*yield*/, (0, Order_Service_1.FindOrder)({ _id: orderID })];
            case 1:
                order = _a.sent();
                if (!order) {
                    return [2 /*return*/, res.status(404).json({ message: "ORDER HAS NOT FOUND" })];
                }
                if (order.status !== Common_1.default.status.UNCONFIRMED &&
                    order.status !== Common_1.default.status.WAITING &&
                    order.status !== Common_1.default.status.SHIPPING) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "THIS ORDER IS NOT ALLOWED UPDATE" })];
                }
                statusUpdated = (0, Order_Service_1.ReturnStatusUpdated)(order.status);
                return [4 /*yield*/, (0, User_Service_1.GetUserID)(req)];
            case 2:
                EditerLogined = _a.sent();
                return [4 /*yield*/, (0, Order_Service_1.UpdateOrder)({ _id: orderID }, { status: statusUpdated, updatedBy: EditerLogined }, { new: false })];
            case 3:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.UpdateStatusOrderHandler = UpdateStatusOrderHandler;
var CreateOrderDetailHandler = function (data, orderID) { return __awaiter(void 0, void 0, void 0, function () {
    var total, i, orderDetail, detail, product, price;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                total = 0;
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < data.length)) return [3 /*break*/, 6];
                orderDetail = {
                    order: orderID,
                    product: data[i].product,
                    quantity: data[i].quantity,
                    size: data[i].size,
                    note: data[i].note,
                };
                return [4 /*yield*/, (0, OrderDetail_Service_1.CreateOrderDetail)(orderDetail)];
            case 2:
                detail = _a.sent();
                return [4 /*yield*/, (0, Product_Service_1.FindProduct)({ _id: data[i].product })];
            case 3:
                product = _a.sent();
                price = (product.price + (0, Cart_Service_1.GetPriceBySize)(data[i].size)) * data[i].quantity;
                return [4 /*yield*/, (0, OrderDetail_Service_1.UpdateOrderDetail)({ _id: detail._id }, { price: price }, { new: true })];
            case 4:
                _a.sent();
                total = total + price;
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/, total];
        }
    });
}); };
exports.CreateOrderDetailHandler = CreateOrderDetailHandler;
var GamMake = function (size) {
    if (size === "S") {
        return 200;
    }
    if (size === "M") {
        return 250;
    }
    return 300;
};
var DecrementQuantityStock = function (orderDetails) { return __awaiter(void 0, void 0, void 0, function () {
    var i, productID, gamMake, product, category, receipt, existGam;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < orderDetails.length)) return [3 /*break*/, 7];
                productID = orderDetails[i].product;
                gamMake = GamMake(orderDetails[i].size) * parseInt(orderDetails[i].quantity);
                return [4 /*yield*/, (0, Product_Service_1.FindProduct)({ _id: productID })];
            case 2:
                product = _a.sent();
                return [4 /*yield*/, (0, Category_Service_1.FindCategory)({ _id: product === null || product === void 0 ? void 0 : product.category })];
            case 3:
                category = _a.sent();
                return [4 /*yield*/, (0, Receipt_Service_1.FindReceipt)({ category: category === null || category === void 0 ? void 0 : category._id })];
            case 4:
                receipt = _a.sent();
                existGam = parseInt(receipt.quantityStock) - gamMake;
                if (existGam < 0) {
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, (0, Receipt_Service_1.UpdateReceipt)({ _id: receipt._id }, { quantityStock: existGam }, { new: false })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/, true];
        }
    });
}); };
exports.DecrementQuantityStock = DecrementQuantityStock;
var BodyGetListOrderForUser = function (listOrderIDs) { return __awaiter(void 0, void 0, void 0, function () {
    var result, i, order, details, i_1, product, images;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = [];
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < listOrderIDs.length)) return [3 /*break*/, 10];
                return [4 /*yield*/, (0, Order_Service_1.FindOrder)({ _id: listOrderIDs[i] })];
            case 2:
                order = _a.sent();
                return [4 /*yield*/, (0, OrderDetail_Service_1.GetListOrderDetails)({ order: listOrderIDs[i] })];
            case 3:
                details = _a.sent();
                i_1 = 0;
                _a.label = 4;
            case 4:
                if (!(i_1 < details.length)) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, Product_Service_1.FindProduct)({ _id: details[i_1].product })];
            case 5:
                product = _a.sent();
                return [4 /*yield*/, (0, Image_Service_1.GetImagesByProductID)({
                        product: details[i_1].product,
                    })];
            case 6:
                images = _a.sent();
                details[i_1] = __assign(__assign({}, details[i_1]._doc), { product: __assign(__assign({}, product), { images: images }) });
                _a.label = 7;
            case 7:
                i_1++;
                return [3 /*break*/, 4];
            case 8:
                result = __spreadArray(__spreadArray([], result, true), [__assign(__assign({}, order), { orderDetails: __spreadArray([], details, true) })], false);
                _a.label = 9;
            case 9:
                i++;
                return [3 /*break*/, 1];
            case 10: return [2 /*return*/, result];
        }
    });
}); };
var BodyGetListOrder = function (res, listOrders) { return __awaiter(void 0, void 0, void 0, function () {
    var result, arrOrders, i, orderID, order, details, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                result = [];
                arrOrders = Object.values(listOrders);
                i = 0;
                _b.label = 1;
            case 1:
                if (!(i < arrOrders.length)) return [3 /*break*/, 6];
                orderID = arrOrders[i]._id;
                return [4 /*yield*/, (0, Order_Service_1.FindOrder)({ _id: orderID })];
            case 2:
                order = _b.sent();
                return [4 /*yield*/, (0, OrderDetail_Service_1.GetListOrderDetails)({ order: orderID })];
            case 3:
                details = _b.sent();
                if (!order)
                    return [2 /*return*/, res.status(404).json({ message: "ORDER HAS NOT FOUND" })];
                _a = order;
                return [4 /*yield*/, (0, User_Service_1.FindUser)({ _id: order.updatedBy })];
            case 4:
                _a.updatedBy = _b.sent();
                result = __spreadArray(__spreadArray([], result, true), [__assign(__assign({}, order), { orderDetails: __spreadArray([], details, true) })], false);
                _b.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/, result];
        }
    });
}); };
var DeleteAllOrderHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, OrderDetail_Service_1.DeleteAllOrderDetails)({})];
            case 1:
                _a.sent();
                return [2 /*return*/, res.sendStatus(200)];
        }
    });
}); };
exports.DeleteAllOrderHandler = DeleteAllOrderHandler;
