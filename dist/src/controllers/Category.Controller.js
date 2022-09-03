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
exports.DeleteCategoryByIDHandler = exports.UpdateCategoryHandler = exports.GetListCategorySortedByNameHandler = exports.GetListCategoryHandler = exports.GetCategoryHandler = exports.CreateCategoryHandler = void 0;
var Category_Service_1 = require("../services/Category.Service");
var lodash_1 = require("lodash");
var User_Service_1 = require("../services/User.Service");
var Product_Service_1 = require("../services/Product.Service");
var Receipt_Service_1 = require("../services/Receipt.Service");
var CreateCategoryHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var category, categoryID, userID, result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, (0, Category_Service_1.CreateCategory)(req.body)];
            case 1:
                category = _a.sent();
                categoryID = category._id;
                return [4 /*yield*/, (0, User_Service_1.GetUserID)(req)];
            case 2:
                userID = _a.sent();
                return [4 /*yield*/, (0, Receipt_Service_1.CreateReceipt)(__assign(__assign({}, req.body), { quantityStock: 0, price: 0, category: categoryID, user: userID }))];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, Category_Service_1.UpdateCategory)({ _id: category._id }, {
                        createdBy: userID,
                        updatedBy: userID,
                    }, {
                        new: true,
                    })];
            case 4:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
            case 5:
                e_1 = _a.sent();
                return [2 /*return*/, res.sendStatus(409)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.CreateCategoryHandler = CreateCategoryHandler;
var GetCategoryHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, result, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = (0, lodash_1.get)(req, "params.id");
                return [4 /*yield*/, (0, Category_Service_1.FindCategory)({ _id: _id })];
            case 1:
                result = _a.sent();
                if (!result) {
                    return [2 /*return*/, res.status(404).json({ message: "CATEGORY HAS NOT FOUND" })];
                }
                return [4 /*yield*/, (0, User_Service_1.FindUser)({ _id: result.createdBy })];
            case 2:
                user = _a.sent();
                result.createdBy = (user === null || user === void 0 ? void 0 : user.lastName) + " " + (user === null || user === void 0 ? void 0 : user.firstName);
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetCategoryHandler = GetCategoryHandler;
var GetListCategoryHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var list, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Category_Service_1.GetListCategory)({})];
            case 1:
                list = _a.sent();
                if (!list) {
                    return [2 /*return*/, res.status(404).json({ message: "LIST CATEGORY IS EMPTY " })];
                }
                return [4 /*yield*/, BodyGetResult(list)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetListCategoryHandler = GetListCategoryHandler;
var GetListCategorySortedByNameHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var type, by, list, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                type = req.body.type;
                if (!(0, Category_Service_1.TypeIsSuitable)(type)) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "TYPE IS 'INCREMENT' OR 'DECREMENT" })];
                }
                by = (0, Category_Service_1.GetTypeSort)(type);
                return [4 /*yield*/, (0, Category_Service_1.GetListCategorySortedByName)(by)];
            case 1:
                list = _a.sent();
                if (!list) {
                    return [2 /*return*/, res.status(404).json({ message: "LSIT CATEGORIES IS EMPTY" })];
                }
                return [4 /*yield*/, BodyGetResult(list)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetListCategorySortedByNameHandler = GetListCategorySortedByNameHandler;
var UpdateCategoryHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, category, name, userID, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = (0, lodash_1.get)(req, "params.id");
                if (!_id) {
                    return [2 /*return*/, res.status(400).json({ message: "ID CATEGORY IS REQUIRED" })];
                }
                return [4 /*yield*/, (0, Category_Service_1.FindCategory)({ _id: _id })];
            case 1:
                category = _a.sent();
                if (!category) {
                    return [2 /*return*/, res.status(404).json({ nessage: "CATEGORY HAS NOT FOUND" })];
                }
                name = req.body.name;
                return [4 /*yield*/, (0, User_Service_1.GetUserID)(req)];
            case 2:
                userID = _a.sent();
                return [4 /*yield*/, (0, Category_Service_1.UpdateCategory)({ _id: _id }, { name: name, updatedBy: userID }, { new: true })];
            case 3:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.UpdateCategoryHandler = UpdateCategoryHandler;
var DeleteCategoryByIDHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryID, receipt, products, category;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                categoryID = (0, lodash_1.get)(req, "params.id");
                if (!categoryID) {
                    return [2 /*return*/, res.status(400).json({ message: "ID CATEGORY IS REQUIRED" })];
                }
                return [4 /*yield*/, (0, Receipt_Service_1.FindReceipt)({ category: categoryID })];
            case 1:
                receipt = _a.sent();
                return [4 /*yield*/, (0, Product_Service_1.FindProduct)({ category: categoryID })];
            case 2:
                products = _a.sent();
                if (products || receipt) {
                    return [2 /*return*/, res.status(405).json({ message: "CANT NOT REMOVE THIS CATEGORY" })];
                }
                return [4 /*yield*/, (0, Category_Service_1.FindCategory)({ _id: categoryID })];
            case 3:
                category = _a.sent();
                if (!category) {
                    return [2 /*return*/, res.status(404).json({ message: "CATEGORY HAS NOT FOUND" })];
                }
                return [4 /*yield*/, (0, Category_Service_1.DeleteCategory)({ _id: categoryID })];
            case 4:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "DELETE SUCCESSFUL" })];
        }
    });
}); };
exports.DeleteCategoryByIDHandler = DeleteCategoryByIDHandler;
var BodyGetResult = function (result) { return __awaiter(void 0, void 0, void 0, function () {
    var i, userCreate, userUpdated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < result.length)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, User_Service_1.FindUser)({ _id: result[i].createdBy })];
            case 2:
                userCreate = _a.sent();
                result[i].createdBy = (userCreate === null || userCreate === void 0 ? void 0 : userCreate.lastName) + " " + (userCreate === null || userCreate === void 0 ? void 0 : userCreate.firstName);
                return [4 /*yield*/, (0, User_Service_1.FindUser)({ _id: result[i].updatedBy })];
            case 3:
                userUpdated = _a.sent();
                result[i].updatedBy = (userUpdated === null || userUpdated === void 0 ? void 0 : userUpdated.lastName) + " " + (userUpdated === null || userUpdated === void 0 ? void 0 : userUpdated.firstName);
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/, result];
        }
    });
}); };
