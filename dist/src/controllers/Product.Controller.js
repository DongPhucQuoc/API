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
exports.SupportGetProductByID = exports.DeleteProductByIDHandler = exports.UpdateProductHandler = exports.GetLengthOfProductWithCategoryHandler = exports.GetLengthOfProductHandler = exports.GetListProductWithPageHandler = exports.GetListProductForOrderHandler = exports.GetListProductSortedByNameAndPriceHandler = exports.GetListProductsByCategoryHandler = exports.GetListProductByCategorySortedByNameAndPriceHandler = exports.GetListProductByCategorySortedByPriceHandler = exports.GetListProductByCategorySortedByNameHandler = exports.GetListProductSortByPriceWithPageHandler = exports.GetListProductSortByPriceHandler = exports.GetListProductsSortedByNameWithPageHandler = exports.GetListProductsSortedByNameHandler = exports.GetListProductHandler = exports.GetProductByIDHandler = exports.CreateProductHandler = void 0;
var Product_Service_1 = require("../services/Product.Service");
var Image_Service_1 = require("../services/Image.Service");
var lodash_1 = require("lodash");
var Category_Service_1 = require("../services/Category.Service");
var Image_Controller_1 = require("./Image.Controller");
var Cart_Service_1 = require("../services/Cart.Service");
var OrderDetail_Service_1 = require("../services/OrderDetail.Service");
var CreateProductHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, idProduct, images, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, (0, Product_Service_1.CreateProduct)(req.body)];
            case 1:
                product = _a.sent();
                idProduct = product._id;
                return [4 /*yield*/, (0, Image_Service_1.CreateImage)(__assign(__assign({}, req.body), { product: idProduct }))];
            case 2:
                images = _a.sent();
                return [4 /*yield*/, (0, Product_Service_1.UpdateProduct)({ _id: idProduct }, { images: images }, { new: true })];
            case 3:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
            case 4:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(400).json({ error: error_1 })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.CreateProductHandler = CreateProductHandler;
var GetProductByIDHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productID, result, category, images;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productID = (0, lodash_1.get)(req, "params.id");
                if (!productID) {
                    return [2 /*return*/, res.status(400).json({ message: "PRODUCT ID IS REQUIRED" })];
                }
                return [4 /*yield*/, (0, Product_Service_1.FindProduct)({ _id: productID })];
            case 1:
                result = _a.sent();
                if (!result) {
                    return [2 /*return*/, res.status(404).json({ message: "PRODUCT HAS NOT FOUND" })];
                }
                return [4 /*yield*/, (0, Category_Service_1.FindNameCategory)({ _id: result.category })];
            case 2:
                category = _a.sent();
                result.category = category;
                return [4 /*yield*/, (0, Image_Service_1.GetImagesByProductID)({ product: productID })];
            case 3:
                images = _a.sent();
                result = __assign(__assign({}, result), { images: images });
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetProductByIDHandler = GetProductByIDHandler;
var GetListProductHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var list, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Product_Service_1.GetListProduct)({})];
            case 1:
                list = _a.sent();
                if (!list) {
                    return [2 /*return*/, res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" })];
                }
                return [4 /*yield*/, BodyGetResult(list)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetListProductHandler = GetListProductHandler;
var GetListProductsSortedByNameHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var type, by, list, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                type = req.body.type;
                if (!(0, Product_Service_1.TypeIsSuitable)(type)) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "TYPE IS 'INCREMENT' OR 'DECREMENT'" })];
                }
                by = (0, Product_Service_1.GetTypeSort)(type);
                return [4 /*yield*/, (0, Product_Service_1.GetListProductSortedByName)(by)];
            case 1:
                list = _a.sent();
                if (!list) {
                    return [2 /*return*/, res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" })];
                }
                return [4 /*yield*/, BodyGetResultForSort(list)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetListProductsSortedByNameHandler = GetListProductsSortedByNameHandler;
var GetListProductsSortedByNameWithPageHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, skip, type, by, list, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = (0, lodash_1.get)(req, "params.page");
                skip = (parseInt(page) - 1) * 6;
                type = req.body.type;
                if (!(0, Product_Service_1.TypeIsSuitable)(type)) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "TYPE IS 'INCREMENT' OR 'DECREMENT'" })];
                }
                by = (0, Product_Service_1.GetTypeSort)(type);
                return [4 /*yield*/, (0, Product_Service_1.GetListProductSortedByNameWithPage)(by, skip, 6)];
            case 1:
                list = _a.sent();
                if (!list) {
                    return [2 /*return*/, res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" })];
                }
                return [4 /*yield*/, BodyGetResultForSort(list)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetListProductsSortedByNameWithPageHandler = GetListProductsSortedByNameWithPageHandler;
var GetListProductSortByPriceHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var type, by, list, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                type = req.body.type;
                if (!(0, Product_Service_1.TypeIsSuitable)(type)) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "TYPE IS 'INCREMENT' OR 'DECREMENT'" })];
                }
                by = (0, Product_Service_1.GetTypeSort)(type);
                return [4 /*yield*/, (0, Product_Service_1.GetListProductSortedByPrice)(by)];
            case 1:
                list = _a.sent();
                if (!list) {
                    return [2 /*return*/, res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" })];
                }
                return [4 /*yield*/, BodyGetResultForSort(list)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetListProductSortByPriceHandler = GetListProductSortByPriceHandler;
var GetListProductSortByPriceWithPageHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, skip, type, by, list, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = (0, lodash_1.get)(req, "params.page");
                skip = (parseInt(page) - 1) * 6;
                type = req.body.type;
                if (!(0, Product_Service_1.TypeIsSuitable)(type)) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "TYPE IS 'INCREMENT' OR 'DECREMENT'" })];
                }
                by = (0, Product_Service_1.GetTypeSort)(type);
                return [4 /*yield*/, (0, Product_Service_1.GetListProductSortedByPriceWithPage)(by, skip, 6)];
            case 1:
                list = _a.sent();
                if (!list) {
                    return [2 /*return*/, res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" })];
                }
                return [4 /*yield*/, BodyGetResultForSort(list)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetListProductSortByPriceWithPageHandler = GetListProductSortByPriceWithPageHandler;
var GetListProductByCategorySortedByNameHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCategory, type, by, list, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idCategory = (0, lodash_1.get)(req, "params.idCategory");
                type = req.body.type;
                if (!(0, Product_Service_1.TypeIsSuitable)(type)) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "TYPE IS 'INCREMENT' OR 'DECREMENT'" })];
                }
                by = (0, Product_Service_1.GetTypeSort)(type);
                return [4 /*yield*/, (0, Product_Service_1.GetListProductByCategoryAndSortedByName)(idCategory, by)];
            case 1:
                list = _a.sent();
                if (!list) {
                    return [2 /*return*/, res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" })];
                }
                return [4 /*yield*/, BodyGetResultForSort(list)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetListProductByCategorySortedByNameHandler = GetListProductByCategorySortedByNameHandler;
var GetListProductByCategorySortedByPriceHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCategory, type, by, list, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idCategory = (0, lodash_1.get)(req, "params.idCategory");
                type = req.body.type;
                if (!(0, Product_Service_1.TypeIsSuitable)(type)) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "TYPE IS 'INCREMENT' OR 'DECREMENT'" })];
                }
                by = (0, Product_Service_1.GetTypeSort)(type);
                return [4 /*yield*/, (0, Product_Service_1.GetListProductByCategoryAndSortedByPrice)(idCategory, by)];
            case 1:
                list = _a.sent();
                if (!list) {
                    return [2 /*return*/, res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" })];
                }
                return [4 /*yield*/, BodyGetResultForSort(list)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetListProductByCategorySortedByPriceHandler = GetListProductByCategorySortedByPriceHandler;
var GetListProductByCategorySortedByNameAndPriceHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCategory, typeName, typePrice, byName, byPrice, list, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idCategory = (0, lodash_1.get)(req, "params.idCategory");
                typeName = req.body.typeName;
                typePrice = req.body.typePrice;
                if (!(0, Product_Service_1.TypeIsSuitable)(typeName) || !(0, Product_Service_1.TypeIsSuitable)(typePrice)) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "TYPE IS 'INCREMENT' OR 'DECREMENT'" })];
                }
                byName = (0, Product_Service_1.GetTypeSort)(typeName);
                byPrice = (0, Product_Service_1.GetTypeSort)(typePrice);
                return [4 /*yield*/, (0, Product_Service_1.GetListProductByCategorySortedByNameAndPrice)(idCategory, byName, byPrice)];
            case 1:
                list = _a.sent();
                if (!list) {
                    return [2 /*return*/, res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" })];
                }
                return [4 /*yield*/, BodyGetResultForSort(list)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetListProductByCategorySortedByNameAndPriceHandler = GetListProductByCategorySortedByNameAndPriceHandler;
var GetListProductsByCategoryHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var category, list, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                category = (0, lodash_1.get)(req, "params.category");
                if (!category) {
                    return [2 /*return*/, res.status(400).json({ message: "TYPE PRODUCT IS REQUIRED" })];
                }
                return [4 /*yield*/, (0, Product_Service_1.GetListProduct)({ category: category })];
            case 1:
                list = _a.sent();
                if (!list) {
                    res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" });
                }
                return [4 /*yield*/, BodyGetResult(list)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetListProductsByCategoryHandler = GetListProductsByCategoryHandler;
var GetListProductSortedByNameAndPriceHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var typeName, typePrice, byName, byPrice, list, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                typeName = req.body.typeName;
                typePrice = req.body.typePrice;
                if (!(0, Product_Service_1.TypeIsSuitable)(typeName) || !(0, Product_Service_1.TypeIsSuitable)(typePrice)) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "TYPE IS 'INCREMENT' OR 'DECREMENT'" })];
                }
                byName = (0, Product_Service_1.GetTypeSort)(typeName);
                byPrice = (0, Product_Service_1.GetTypeSort)(typePrice);
                return [4 /*yield*/, (0, Product_Service_1.GetListProductSortedByNameAndPrice)(byName, byPrice)];
            case 1:
                list = _a.sent();
                if (!list) {
                    return [2 /*return*/, res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" })];
                }
                return [4 /*yield*/, BodyGetResultForSort(list)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetListProductSortedByNameAndPriceHandler = GetListProductSortedByNameAndPriceHandler;
var GetListProductForOrderHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var list, result, i, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                list = req.body.list;
                result = [];
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < list.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, Product_Service_1.FindProduct)({ _id: list[i] })];
            case 2:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({ message: "PRODUCT HAS NOT FOUND" })];
                }
                result.push(product);
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetListProductForOrderHandler = GetListProductForOrderHandler;
var GetListProductWithPageHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, skip, list, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = (0, lodash_1.get)(req, "params.page");
                if (parseInt(page) <= 0) {
                    return [2 /*return*/, res.status(400).json({ message: "Page must be bigger than 0" })];
                }
                skip = (parseInt(page) - 1) * 6;
                return [4 /*yield*/, (0, Product_Service_1.GetListProductWithPage)({}, skip, 6)];
            case 1:
                list = _a.sent();
                if (list.length === 0) {
                    return [2 /*return*/, res.status(200).json({ result: [] })];
                }
                return [4 /*yield*/, BodyGetResult(list)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetListProductWithPageHandler = GetListProductWithPageHandler;
var GetLengthOfProductHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var list, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Product_Service_1.GetListProduct)({})];
            case 1:
                list = _a.sent();
                result = list.length;
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetLengthOfProductHandler = GetLengthOfProductHandler;
var GetLengthOfProductWithCategoryHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var category, list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                category = (0, lodash_1.get)(req, "params.category");
                return [4 /*yield*/, (0, Product_Service_1.GetListProduct)({ category: category })];
            case 1:
                list = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: list.length })];
        }
    });
}); };
exports.GetLengthOfProductWithCategoryHandler = GetLengthOfProductWithCategoryHandler;
var UpdateProductHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productID, product, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productID = (0, lodash_1.get)(req, "params.id");
                if (!productID) {
                    return [2 /*return*/, res.status(400).json({ message: "PRODUCT ID IS REQUIRED" })];
                }
                return [4 /*yield*/, (0, Product_Service_1.FindProduct)({ _id: productID })];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({ message: "PRODUCT HAS NOT FOUND" })];
                }
                return [4 /*yield*/, (0, Product_Service_1.UpdateProduct)({ _id: productID }, req.body, {
                        new: true,
                    })];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.UpdateProductHandler = UpdateProductHandler;
var DeleteProductByIDHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productID, cart, orderDetail, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productID = (0, lodash_1.get)(req, "params.id");
                if (!productID) {
                    return [2 /*return*/, res.status(400).json({ message: "ID PRODUCT IS REQUIRED" })];
                }
                return [4 /*yield*/, (0, Cart_Service_1.FindCart)({ product: productID })];
            case 1:
                cart = _a.sent();
                return [4 /*yield*/, (0, OrderDetail_Service_1.FindOrderDetails)({ product: productID })];
            case 2:
                orderDetail = _a.sent();
                if (cart || orderDetail) {
                    return [2 /*return*/, res.status(405).json({ message: "CAN NOT REMOVE THIS PRODUCT" })];
                }
                return [4 /*yield*/, (0, Product_Service_1.FindProduct)({ _id: productID })];
            case 3:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.sendStatus(404)];
                }
                return [4 /*yield*/, (0, Image_Controller_1.DeleteImagesHandler)(productID)];
            case 4:
                _a.sent();
                return [4 /*yield*/, (0, Product_Service_1.DeleteProduct)({ _id: productID })];
            case 5:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "DELETE SUCCESSFUL" })];
        }
    });
}); };
exports.DeleteProductByIDHandler = DeleteProductByIDHandler;
var SupportGetProductByID = function (req, res, productID) { return __awaiter(void 0, void 0, void 0, function () {
    var result, category, images;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Product_Service_1.FindProduct)({ _id: productID })];
            case 1:
                result = _a.sent();
                if (!result) {
                    return [2 /*return*/, res.status(404).json({ message: "PRODUCT HAS NOT FOUND" })];
                }
                return [4 /*yield*/, (0, Category_Service_1.FindNameCategory)({ _id: result.category })];
            case 2:
                category = _a.sent();
                result.category = category;
                return [4 /*yield*/, (0, Image_Service_1.GetImagesByProductID)({ product: productID })];
            case 3:
                images = _a.sent();
                result = __assign(__assign({}, result), { images: images });
                return [2 /*return*/, result];
        }
    });
}); };
exports.SupportGetProductByID = SupportGetProductByID;
var BodyGetResult = function (result) { return __awaiter(void 0, void 0, void 0, function () {
    var i, idCategory, idProduct, nameCategory, images;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < result.length)) return [3 /*break*/, 5];
                idCategory = result[i].category;
                idProduct = result[i]._id;
                return [4 /*yield*/, (0, Category_Service_1.FindNameCategory)({ _id: idCategory })];
            case 2:
                nameCategory = _a.sent();
                return [4 /*yield*/, (0, Image_Service_1.GetImagesByProductID)({ product: idProduct })];
            case 3:
                images = _a.sent();
                result[i] = __assign(__assign({}, result[i]._doc), { category: nameCategory, images: images });
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/, result];
        }
    });
}); };
var BodyGetResultForSort = function (result) { return __awaiter(void 0, void 0, void 0, function () {
    var i, idCategory, idProduct, nameCategory, images;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < result.length)) return [3 /*break*/, 5];
                idCategory = result[i].category;
                idProduct = result[i]._id;
                return [4 /*yield*/, (0, Category_Service_1.FindNameCategory)({ _id: idCategory })];
            case 2:
                nameCategory = _a.sent();
                return [4 /*yield*/, (0, Image_Service_1.GetImagesByProductID)({ product: idProduct })];
            case 3:
                images = _a.sent();
                result[i] = __assign(__assign({}, result[i]), { category: nameCategory, images: images });
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/, result];
        }
    });
}); };
