import {
  StatisticOrderByDayHandler,
  StatisticOrderByMonthHandler,
  StatisticOrderByYearHandler,
  StatisticOrderByUserIDHandler,
} from "./../controllers/Statistic.Controller";
import { Express } from "express";
import { RequireAdmin, VerifyLogin } from "../middleware/Authentication";
import ValidateRequest from "../middleware/ValidateRequest";
import {
  GetStatisticByDay,
  GetStatisticByMonth,
} from "../schema/Statistic.Schema";

const StatisticRoute = (app: Express) => {
  app.get("/statistic", VerifyLogin, StatisticOrderByUserIDHandler);
  app.get(
    "/statistic/year",
    VerifyLogin,
    RequireAdmin,
    StatisticOrderByYearHandler
  );
  app.post(
    "/statistic/day",
    VerifyLogin,
    RequireAdmin,
    ValidateRequest(GetStatisticByDay),
    StatisticOrderByDayHandler
  );
  app.post(
    "/statistic/month",
    VerifyLogin,
    RequireAdmin,
    ValidateRequest(GetStatisticByMonth),
    StatisticOrderByMonthHandler
  );
};

export default StatisticRoute;
