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
exports.GetReceiptByIDHandler = exports.GetListReceiptHandler = exports.DeleteReceiptHandler = exports.UpdateReceiptHandler = exports.CreateReceiptHandler = exports.CheckReceiptID = void 0;
var lodash_1 = require("lodash");
var Category_Service_1 = require("../services/Category.Service");
var Receipt_Service_1 = require("../services/Receipt.Service");
var User_Service_1 = require("../services/User.Service");
var CheckReceiptID = function (res, receiptID) { return __awaiter(void 0, void 0, void 0, function () {
    var receipt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Receipt_Service_1.FindReceipt)({ _id: receiptID })];
            case 1:
                receipt = _a.sent();
                if (!receipt) {
                    return [2 /*return*/, res.status(404).json({ message: "RECEIPT IS NOT FOUND" })];
                }
                return [2 /*return*/, receipt];
        }
    });
}); };
exports.CheckReceiptID = CheckReceiptID;
var CreateReceiptHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryID, category, userID, receipt, quantityStock, price, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                categoryID = req.body.category;
                return [4 /*yield*/, (0, Category_Service_1.FindCategory)({ _id: categoryID })];
            case 1:
                category = _a.sent();
                if (!category) {
                    return [2 /*return*/, res.status(404).json({ message: "CATEGORY IS NOT FOUND" })];
                }
                return [4 /*yield*/, (0, User_Service_1.GetUserID)(req)];
            case 2:
                userID = _a.sent();
                return [4 /*yield*/, (0, Receipt_Service_1.FindReceipt)({ category: categoryID })];
            case 3:
                receipt = _a.sent();
                quantityStock = parseInt(receipt.quantityStock) + parseInt(req.body.quantityStock);
                price = (parseInt(receipt.price.toString()) + parseInt(req.body.price)) / 2;
                return [4 /*yield*/, (0, Receipt_Service_1.UpdateReceipt)({ _id: receipt._id }, { quantityStock: quantityStock, user: userID, price: price }, { new: true })];
            case 4:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.CreateReceiptHandler = CreateReceiptHandler;
var UpdateReceiptHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var receiptID, userID, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                receiptID = (0, lodash_1.get)(req, "params.id");
                return [4 /*yield*/, (0, exports.CheckReceiptID)(res, receiptID)];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, User_Service_1.GetUserID)(req)];
            case 2:
                userID = _a.sent();
                return [4 /*yield*/, (0, Receipt_Service_1.UpdateReceipt)({ _id: receiptID }, __assign(__assign({}, req.body), { user: userID }), { new: true })];
            case 3:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.UpdateReceiptHandler = UpdateReceiptHandler;
var DeleteReceiptHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var receiptID, receipt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                receiptID = (0, lodash_1.get)(req, "params.id");
                return [4 /*yield*/, (0, exports.CheckReceiptID)(res, receiptID)];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, Receipt_Service_1.DeleteReceipt)({ _id: receiptID })];
            case 2:
                receipt = _a.sent();
                if (receipt.quantityStock > 0) {
                    return [2 /*return*/, res.status(405).json({ message: "CAN'T REMOVE THIS RECEIPT" })];
                }
                return [2 /*return*/, res.status(200).json({ message: "DELETE SUCCESSFUL" })];
        }
    });
}); };
exports.DeleteReceiptHandler = DeleteReceiptHandler;
var GetListReceiptHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var list, result, i, categoryID, category, user, name_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Receipt_Service_1.FindAllReceipt)({})];
            case 1:
                list = _a.sent();
                result = [];
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < list.length)) return [3 /*break*/, 6];
                categoryID = list[i].category;
                return [4 /*yield*/, (0, Category_Service_1.FindCategory)({ _id: categoryID })];
            case 3:
                category = _a.sent();
                return [4 /*yield*/, (0, User_Service_1.FindUser)({ _id: list[i].user })];
            case 4:
                user = _a.sent();
                name_1 = (user === null || user === void 0 ? void 0 : user.lastName) + " " + (user === null || user === void 0 ? void 0 : user.firstName);
                result[i] = __assign(__assign({}, list[i]._doc), { category: category === null || category === void 0 ? void 0 : category.name, user: name_1 });
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 2];
            case 6: return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetListReceiptHandler = GetListReceiptHandler;
var GetReceiptByIDHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var receiptID, receipt, user, name, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                receiptID = (0, lodash_1.get)(req, "params.id");
                return [4 /*yield*/, (0, exports.CheckReceiptID)(res, receiptID)];
            case 1:
                receipt = _a.sent();
                return [4 /*yield*/, (0, User_Service_1.FindUser)({ _id: receipt.user })];
            case 2:
                user = _a.sent();
                name = (user === null || user === void 0 ? void 0 : user.lastName) + " " + (user === null || user === void 0 ? void 0 : user.firstName);
                result = __assign(__assign({}, receipt._doc), { user: name });
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetReceiptByIDHandler = GetReceiptByIDHandler;
