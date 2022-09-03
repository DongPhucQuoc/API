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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticOrderByUserIDHandler = exports.StatisticOrderByYearHandler = exports.StatisticOrderByMonthHandler = exports.StatisticOrderByDayHandler = void 0;
var Order_Service_1 = require("../services/Order.Service");
var User_Service_1 = require("../services/User.Service");
var StatisticOrderByDayHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dateString, date, cdd, cmm, cyy, count, total, list, i, shippedDate, dd, mm, yy;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dateString = req.body.dateString;
                date = new Date(dateString);
                cdd = date.getDate();
                cmm = date.getMonth() + 1;
                cyy = date.getFullYear();
                count = 0;
                total = 0;
                return [4 /*yield*/, (0, Order_Service_1.GetListOrder)({})];
            case 1:
                list = _a.sent();
                for (i = 0; i < list.length; i++) {
                    shippedDate = new Date(list[i].shippedDate);
                    dd = shippedDate.getDate();
                    mm = shippedDate.getMonth() + 1;
                    yy = shippedDate.getFullYear();
                    if (cdd === dd && cmm === mm && cyy === yy) {
                        count = count + 1;
                        total = total + list[i].total;
                    }
                }
                return [2 /*return*/, res.status(200).json({ result: { total: total, count: count } })];
        }
    });
}); };
exports.StatisticOrderByDayHandler = StatisticOrderByDayHandler;
var StatisticOrderByMonthHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var year, statistic, result, i, j;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                year = req.body.year;
                return [4 /*yield*/, (0, Order_Service_1.StatisticOrderByMonth)()];
            case 1:
                statistic = _a.sent();
                result = [
                    { month: 1, total: 0 },
                    { month: 2, total: 0 },
                    { month: 3, total: 0 },
                    { month: 4, total: 0 },
                    { month: 5, total: 0 },
                    { month: 6, total: 0 },
                    { month: 7, total: 0 },
                    { month: 8, total: 0 },
                    { month: 9, total: 0 },
                    { month: 10, total: 0 },
                    { month: 11, total: 0 },
                    { month: 12, total: 0 },
                ];
                for (i = 0; i < result.length; i++) {
                    for (j = 0; j < statistic.length; j++) {
                        if (statistic[j].year === year && result[i].month === statistic[j].month) {
                            result[i].total += statistic[j].total;
                        }
                    }
                }
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.StatisticOrderByMonthHandler = StatisticOrderByMonthHandler;
var StatisticOrderByYearHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var statistic, result, i, j;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Order_Service_1.StatisticOrderByYear)()];
            case 1:
                statistic = _a.sent();
                result = [
                    { year: 2021, total: 0 },
                    { year: 2022, total: 0 },
                    { year: 2023, total: 0 },
                    { year: 2024, total: 0 },
                    { year: 2025, total: 0 },
                ];
                for (i = 0; i < result.length; i++) {
                    for (j = 0; j < statistic.length; j++) {
                        if (result[i].year === statistic[j].year) {
                            result[i].total += statistic[i].total;
                        }
                    }
                }
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.StatisticOrderByYearHandler = StatisticOrderByYearHandler;
var StatisticOrderByUserIDHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, statistic, result, totalBought, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, User_Service_1.GetUserID)(req)];
            case 1:
                userID = _a.sent();
                return [4 /*yield*/, (0, Order_Service_1.StatisticOrderByUserID)(userID)];
            case 2:
                statistic = _a.sent();
                result = [
                    { month: 1, total: 0 },
                    { month: 2, total: 0 },
                    { month: 3, total: 0 },
                    { month: 4, total: 0 },
                    { month: 5, total: 0 },
                    { month: 6, total: 0 },
                    { month: 7, total: 0 },
                    { month: 8, total: 0 },
                    { month: 9, total: 0 },
                    { month: 10, total: 0 },
                    { month: 11, total: 0 },
                    { month: 12, total: 0 },
                    { totalBought: 0 },
                ];
                totalBought = 0;
                for (i = 0; i < statistic.length; i++) {
                    result[statistic[i].month - 1].total =
                        result[statistic[i].month - 1].total + statistic[i].total;
                    totalBought = totalBought + statistic[i].total;
                }
                result[result.length - 1].totalBought = totalBought;
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.StatisticOrderByUserIDHandler = StatisticOrderByUserIDHandler;
