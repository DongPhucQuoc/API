import { GetReceiptByIDHandler } from "./../controllers/Receipt.Controller";
import { RequireStaff } from "./../middleware/Authentication";
import { Express } from "express";
import { VerifyLogin } from "../middleware/Authentication";
import {
  CreateReceiptHandler,
  DeleteReceiptHandler,
  GetListReceiptHandler,
  UpdateReceiptHandler,
} from "../controllers/Receipt.Controller";
import ValidateRequest from "../middleware/ValidateRequest";
import { CreateReceiptSchema } from "../schema/Receipt.Schema";

const ReceiptRoute = (app: Express) => {
  app.get("/receipt", GetListReceiptHandler);
  app.get("/receipt/:id", GetReceiptByIDHandler);
  app.post(
    "/receipt",
    VerifyLogin,
    RequireStaff,
    ValidateRequest(CreateReceiptSchema),
    CreateReceiptHandler
  );
  app.put(
    "/receipt/:id",
    VerifyLogin,
    RequireStaff,
    ValidateRequest(CreateReceiptSchema),
    UpdateReceiptHandler
  );
  app.delete("/receipt/:id", VerifyLogin, RequireStaff, DeleteReceiptHandler);
};

export default ReceiptRoute;
