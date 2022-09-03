"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTypeSort = exports.TypeIsSuitable = exports.GetProductID = exports.DeleteProduct = exports.UpdateProduct = exports.GetListProductByCategorySortedByNameAndPrice = exports.GetListProductSortedByNameAndPrice = exports.GetListProductByCategoryAndSortedByPrice = exports.GetListProductByCategoryAndSortedByName = exports.GetListProductSortedByPriceWithPage = exports.GetListProductSortedByPrice = exports.GetListProductSortedByNameWithPage = exports.GetListProductSortedByName = exports.GetListProductWithPage = exports.GetListProduct = exports.FindProduct = exports.CreateProduct = void 0;
var Product_Model_1 = __importDefault(require("../models/Product.Model"));
var mongoose_1 = __importDefault(require("mongoose"));
var CreateProduct = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            return [2 /*return*/, Product_Model_1.default.create(input)];
        }
        catch (e) {
            throw new Error("Error create product");
        }
        return [2 /*return*/];
    });
}); };
exports.CreateProduct = CreateProduct;
var FindProduct = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product_Model_1.default.findOne(query).lean()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.FindProduct = FindProduct;
var GetListProduct = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product_Model_1.default.find(query)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.GetListProduct = GetListProduct;
var GetListProductWithPage = function (query, skip, limit) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product_Model_1.default.find(query).skip(skip).limit(limit)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.GetListProductWithPage = GetListProductWithPage;
var GetListProductSortedByName = function (by) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product_Model_1.default.aggregate([{ $sort: { name: by } }])];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.GetListProductSortedByName = GetListProductSortedByName;
var GetListProductSortedByNameWithPage = function (by, skip, limit) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product_Model_1.default.aggregate([{ $sort: { name: by } }])
                    .skip(skip)
                    .limit(limit)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.GetListProductSortedByNameWithPage = GetListProductSortedByNameWithPage;
var GetListProductSortedByPrice = function (by) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product_Model_1.default.aggregate([{ $sort: { price: by } }])];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.GetListProductSortedByPrice = GetListProductSortedByPrice;
var GetListProductSortedByPriceWithPage = function (by, skip, limit) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product_Model_1.default.aggregate([{ $sort: { price: by } }])
                    .skip(skip)
                    .limit(limit)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.GetListProductSortedByPriceWithPage = GetListProductSortedByPriceWithPage;
var GetListProductByCategoryAndSortedByName = function (idCategory, by) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product_Model_1.default.aggregate([
                    { $match: { category: new mongoose_1.default.Types.ObjectId("".concat(idCategory)) } },
                    { $sort: { name: by } },
                ])];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.GetListProductByCategoryAndSortedByName = GetListProductByCategoryAndSortedByName;
var GetListProductByCategoryAndSortedByPrice = function (idCategory, by) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product_Model_1.default.aggregate([
                    { $match: { category: new mongoose_1.default.Types.ObjectId("".concat(idCategory)) } },
                    { $sort: { price: by } },
                ])];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.GetListProductByCategoryAndSortedByPrice = GetListProductByCategoryAndSortedByPrice;
var GetListProductSortedByNameAndPrice = function (nameBy, priceBy) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product_Model_1.default.aggregate([{ $sort: { name: nameBy, price: priceBy } }])];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.GetListProductSortedByNameAndPrice = GetListProductSortedByNameAndPrice;
var GetListProductByCategorySortedByNameAndPrice = function (idCategory, nameBy, priceBy) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product_Model_1.default.aggregate([
                    { $match: { category: new mongoose_1.default.Types.ObjectId("".concat(idCategory)) } },
                    { $sort: { name: nameBy, price: priceBy } },
                ])];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.GetListProductByCategorySortedByNameAndPrice = GetListProductByCategorySortedByNameAndPrice;
var UpdateProduct = function (query, update, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, Product_Model_1.default.findOneAndUpdate(query, update, options)];
    });
}); };
exports.UpdateProduct = UpdateProduct;
var DeleteProduct = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product_Model_1.default.findOneAndDelete(query)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.DeleteProduct = DeleteProduct;
var GetProductID = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.body.product;
                return [4 /*yield*/, (0, exports.FindProduct)({ _id: _id })];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, _id];
        }
    });
}); };
exports.GetProductID = GetProductID;
var TypeIsSuitable = function (type) {
    if (type !== "increment" && type !== "decrement") {
        return false;
    }
    return true;
};
exports.TypeIsSuitable = TypeIsSuitable;
var GetTypeSort = function (type) {
    if (type === "decrement") {
        return 1;
    }
    return -1;
};
exports.GetTypeSort = GetTypeSort;
