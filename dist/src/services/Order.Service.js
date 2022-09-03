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
exports.GetListOrderSorted = exports.GetTypeSort = exports.TypeIsSuitable = exports.CheckBySuitable = exports.SendMailOrder = exports.DeleteAllOrder = exports.StatisticOrderByUserID = exports.StatisticOrderByYear = exports.StatisticOrderByMonth = exports.ReturnStatusUpdated = exports.CheckStatusUpdated = exports.GetListOrderID = exports.UpdateOrder = exports.GetListOrderWithPage = exports.GetListOrder = exports.FindOrder = exports.CreateOrder = void 0;
var Order_Model_1 = __importDefault(require("../models/Order.Model"));
var Common_1 = __importDefault(require("../utils/Common"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var Default_1 = __importDefault(require("../../config/Default"));
var CreateOrder = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Order_Model_1.default.create(input)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                e_1 = _a.sent();
                throw new Error("Error create Order");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.CreateOrder = CreateOrder;
var FindOrder = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Order_Model_1.default.findOne(query).lean()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.FindOrder = FindOrder;
var GetListOrder = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Order_Model_1.default.find(query)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.GetListOrder = GetListOrder;
var GetListOrderWithPage = function (query, skip, limit) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Order_Model_1.default.find(query).skip(skip).limit(limit)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.GetListOrderWithPage = GetListOrderWithPage;
var UpdateOrder = function (query, update, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Order_Model_1.default.findOneAndUpdate(query, update, options)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.UpdateOrder = UpdateOrder;
var GetListOrderID = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Order_Model_1.default.find(query).select("_id")];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.GetListOrderID = GetListOrderID;
var CheckStatusUpdated = function (status) {
    if (!status ||
        (status !== Common_1.default.status.WAITING && status !== Common_1.default.status.SHIPPING)) {
        return false;
    }
    return true;
};
exports.CheckStatusUpdated = CheckStatusUpdated;
var ReturnStatusUpdated = function (status) {
    if (status === Common_1.default.status.UNCONFIRMED) {
        return Common_1.default.status.WAITING;
    }
    if (status === Common_1.default.status.WAITING) {
        return Common_1.default.status.SHIPPING;
    }
    if (status === Common_1.default.status.SHIPPING) {
        return Common_1.default.status.SHIPPED;
    }
    return undefined;
};
exports.ReturnStatusUpdated = ReturnStatusUpdated;
var StatisticOrderByMonth = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Order_Model_1.default.aggregate([
                    {
                        $project: {
                            year: { $year: "$shippedDate" },
                            month: { $month: "$shippedDate" },
                            total: "$total",
                        },
                    },
                ])];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.StatisticOrderByMonth = StatisticOrderByMonth;
var StatisticOrderByYear = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Order_Model_1.default.aggregate([
                    {
                        $project: {
                            year: { $year: "$shippedDate" },
                            total: "$total",
                        },
                    }
                ])];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.StatisticOrderByYear = StatisticOrderByYear;
var StatisticOrderByUserID = function (userID) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Order_Model_1.default.aggregate([
                    {
                        $match: { user: userID },
                    },
                    {
                        $project: {
                            month: { $month: "$shippedDate" },
                            total: "$total",
                        },
                    },
                ])];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.StatisticOrderByUserID = StatisticOrderByUserID;
var DeleteAllOrder = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Order_Model_1.default.deleteMany(query)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.DeleteAllOrder = DeleteAllOrder;
var SendMailOrder = function (orderID, to) { return __awaiter(void 0, void 0, void 0, function () {
    var transporter, mailOptions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                transporter = nodemailer_1.default.createTransport({
                    service: "Gmail",
                    port: 465,
                    secure: false,
                    auth: {
                        user: Default_1.default.mailUsername,
                        pass: Default_1.default.mailPassword,
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                });
                mailOptions = {
                    from: Default_1.default.mailUsername,
                    to: to,
                    subject: "XIN CẢM ƠN!",
                    text: "Mã đơn hàng của bạn là: " + orderID,
                };
                return [4 /*yield*/, transporter.sendMail(mailOptions)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.SendMailOrder = SendMailOrder;
var CheckBySuitable = function (by) {
    if (by === "day" || by === "month" || by === "year") {
        return true;
    }
    return false;
};
exports.CheckBySuitable = CheckBySuitable;
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
var GetListOrderSorted = function (by, skip, limit) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Order_Model_1.default.aggregate([{ $sort: { requiredDate: by } }])
                    .skip(skip)
                    .limit(limit)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.GetListOrderSorted = GetListOrderSorted;
