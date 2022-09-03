import { Express } from "express";
import {
  ConfirmOrderHandler,
  CreateOrderHandler,
  GetListOrderHandler,
  GetListOrderByStatusHandler,
  CancelOrderHandler,
  UpdateStatusOrderHandler,
  GetListOrderTrackingByStatusHandler,
  GetListOrderOfOneHandler,
  DeleteAllOrderHandler,
  SetOrderIsPaidHandler,
  GetListOrderSortedHander,
} from "../controllers/Order.Controller";
import {
  VerifyLogin,
  RequireStaff,
} from "../middleware/Authentication";
import ValidateRequest from "../middleware/ValidateRequest";
import { CreateOrderSchema, GetListOrderSortedSchema } from "../schema/Order.Schema";

const OrderRoute = (app: Express) => {
  app.get("/order", VerifyLogin, GetListOrderOfOneHandler);
  app.get("/orders/:page", VerifyLogin, RequireStaff, GetListOrderHandler);
  app.get(
    "/orders/tracking/:status",
    VerifyLogin,
    GetListOrderTrackingByStatusHandler
  );
  app.get(
    "/orders/status/:status",
    VerifyLogin,
    RequireStaff,
    GetListOrderByStatusHandler
  );
  app.get("/order/sorted", VerifyLogin, RequireStaff);

  app.post(
    "/order",
    VerifyLogin,
    ValidateRequest(CreateOrderSchema),
    CreateOrderHandler
  );
  app.post("/order/cancel/:id", VerifyLogin, CancelOrderHandler);
  app.post(
    "/order/confirm/:id",
    VerifyLogin,
    RequireStaff,
    ConfirmOrderHandler
  );
  app.post(
    "/order/update/:id",
    VerifyLogin,
    RequireStaff,
    UpdateStatusOrderHandler
  );
  app.post("/order/paid/:id", VerifyLogin, RequireStaff, SetOrderIsPaidHandler);
  app.post(
    "/order/sorted",
    VerifyLogin,
    RequireStaff,
    ValidateRequest(GetListOrderSortedSchema),
    GetListOrderSortedHander
  );

  app.delete("/order/all", DeleteAllOrderHandler);
};

export default OrderRoute;
