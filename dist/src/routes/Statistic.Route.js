"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Statistic_Controller_1 = require("./../controllers/Statistic.Controller");
var Authentication_1 = require("../middleware/Authentication");
var ValidateRequest_1 = __importDefault(require("../middleware/ValidateRequest"));
var Statistic_Schema_1 = require("../schema/Statistic.Schema");
var StatisticRoute = function (app) {
    app.get("/statistic", Authentication_1.VerifyLogin, Statistic_Controller_1.StatisticOrderByUserIDHandler);
    app.get("/statistic/year", Authentication_1.VerifyLogin, Authentication_1.RequireAdmin, Statistic_Controller_1.StatisticOrderByYearHandler);
    app.post("/statistic/day", Authentication_1.VerifyLogin, Authentication_1.RequireAdmin, (0, ValidateRequest_1.default)(Statistic_Schema_1.GetStatisticByDay), Statistic_Controller_1.StatisticOrderByDayHandler);
    app.post("/statistic/month", Authentication_1.VerifyLogin, Authentication_1.RequireAdmin, (0, ValidateRequest_1.default)(Statistic_Schema_1.GetStatisticByMonth), Statistic_Controller_1.StatisticOrderByMonthHandler);
};
exports.default = StatisticRoute;
