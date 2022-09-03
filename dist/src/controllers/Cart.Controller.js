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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAllCartHandler = exports.DeleteListCartByIDHandler = exports.DeleteCartByIDHandler = exports.UpdateCartByIDHander = exports.GetCartQuantityHandler = exports.GetCartPriceSelectedHandler = exports.GetAllCartHandler = exports.CreateCartHandler = void 0;
var Cart_Service_1 = require("../services/Cart.Service");
var Product_Service_1 = require("../services/Product.Service");
var Product_Controller_1 = require("./Product.Controller");
var lodash_1 = require("lodash");
var CreateCartHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productID, isProductExist, cart, session, flag, i, product, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productID = req.body.product;
                return [4 /*yield*/, (0, Product_Service_1.FindProduct)({ _id: productID })];
            case 1:
                isProductExist = _a.sent();
                if (!isProductExist) {
                    return [2 /*return*/, res.status(404).json({ message: "PRODUCT HAS NOT FOUND" })];
                }
                cart = req.body;
                session = req.session;
                console.log("session", session.carts);
                if (!session.carts) {
                    session.carts = [cart];
                }
                else {
                    flag = false;
                    for (i = 0; i < session.carts.length; i++) {
                        if (session.carts[i].product === cart.product &&
                            session.carts[i].size === cart.size) {
                            flag = true;
                            session.carts[i].quantity += cart.quantity;
                            break;
                        }
                    }
                    if (!flag) {
                        session.carts.push(cart);
                    }
                }
                return [4 /*yield*/, (0, Product_Controller_1.SupportGetProductByID)(req, res, cart.product)];
            case 2:
                product = _a.sent();
                result = __assign(__assign({}, cart), { product: product });
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.CreateCartHandler = CreateCartHandler;
var SupportGetCartInfo = function (req, idProduct) {
    var session = req.session;
    var carts = session.carts;
    for (var i = 0; i < carts.length; i++) {
        if (carts[i].product === idProduct) {
            return carts[i];
        }
    }
};
var GetAllCartHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var session, result, carts, i, product, cart;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                session = req.session;
                if (!session.carts) {
                    return [2 /*return*/, res.status(200).json({ status: "error", session: "SESSION EMPTY" })];
                }
                result = [];
                carts = session.carts;
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < carts.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, Product_Controller_1.SupportGetProductByID)(req, res, carts[i].product)];
            case 2:
                product = _a.sent();
                cart = {
                    product: product,
                    quantity: carts[i].quantity,
                    size: carts[i].size,
                };
                result.push(cart);
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetAllCartHandler = GetAllCartHandler;
var GetCartPriceSelectedHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var session, list, result, i, product, cart;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                session = req.session;
                list = req.body.carts;
                if (list.length === 0) {
                    return [2 /*return*/, res.status(200).json({ result: 0 })];
                }
                result = 0;
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < list.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, Product_Service_1.FindProduct)({ _id: list[i] })];
            case 2:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(400).json({ message: "PRODUCT HAS NOT FOUND" })];
                }
                cart = SupportGetCartInfo(req, list[i]);
                result += (product.price + (0, Cart_Service_1.GetPriceBySize)(cart.size)) * cart.quantity;
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetCartPriceSelectedHandler = GetCartPriceSelectedHandler;
var GetCartQuantityHandler = function (req, res) {
    try {
        var session = req.session;
        var result = (0, lodash_1.get)(session, "carts").length || 0;
        return res.status(200).json({ result: result });
    }
    catch (error) {
        return res.status(400).json({ error: error });
    }
};
exports.GetCartQuantityHandler = GetCartQuantityHandler;
var UpdateCartByIDHander = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var session, idProduct, product, result, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                session = req.session;
                idProduct = req.body.product;
                if (!idProduct) {
                    return [2 /*return*/, res.status(400).json({ message: "ID PRODUCT IS REQUIRED" })];
                }
                return [4 /*yield*/, (0, Product_Service_1.FindProduct)({ _id: idProduct })];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({ message: "PRODUCT HAS NOT FOUND" })];
                }
                result = {
                    product: "",
                    quantity: 0,
                    size: "",
                };
                for (i = 0; i < session.carts.length; i++) {
                    if (session.carts[i].product === idProduct) {
                        session.carts[i].quantity = req.body.quantity;
                        session.carts[i].size = req.body.size;
                        result = {
                            product: product,
                            quantity: session.carts[i].quantity,
                            size: session.carts[i].size,
                        };
                        break;
                    }
                }
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.UpdateCartByIDHander = UpdateCartByIDHander;
var DeleteCartByIDHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idProduct;
    return __generator(this, function (_a) {
        idProduct = (0, lodash_1.get)(req, "params.id");
        if (!idProduct) {
            return [2 /*return*/, res.status(400).json({ message: "ID PRODUCT IS REQUIRED" })];
        }
        SupportDeleteCartByIDProduct(req, idProduct);
        return [2 /*return*/, res.status(200).json({ message: "DELETE SUCCESSFUL" })];
    });
}); };
exports.DeleteCartByIDHandler = DeleteCartByIDHandler;
var DeleteListCartByIDHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var list, i;
    return __generator(this, function (_a) {
        list = req.body.carts;
        for (i = 0; i < list.length; i++) {
            SupportDeleteCartByIDProduct(req, list[i]);
        }
        return [2 /*return*/, res.status(200).json({ message: "DELETE SUCCESSFUL" })];
    });
}); };
exports.DeleteListCartByIDHandler = DeleteListCartByIDHandler;
var DeleteAllCartHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        req.session.destroy(function (err) {
            if (err)
                console.log(err);
            return res.status(200).json({ message: "DELETE SUCCESSFUL" });
        });
        return [2 /*return*/];
    });
}); };
exports.DeleteAllCartHandler = DeleteAllCartHandler;
var SupportDeleteCartByIDProduct = function (req, id) {
    var session = req.session;
    session.carts = session.carts.filter(function (cart) {
        return cart.product !== id;
    });
};
