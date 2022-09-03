import { Express } from "express";
import UserRoute from "./User.Route";
import ProductRoute from "./Product.Route";
import CategoryRoute from "./Category.Route"; 
import CartRoute from "./Cart.Route";
import OrderRoute from "./Order.Route";
import ImageRoute from "./Image.Route";
import PaypalRoute from "./Paypal.Route";
import StatisticRoute from "./Statistic.Route";
import ReceiptRoute from "./Receipt.Route";

const InitialRoute = (app: Express) => {
  UserRoute(app);
  ProductRoute(app);
  CategoryRoute(app);
  CartRoute(app);
  OrderRoute(app);
  ImageRoute(app);
  PaypalRoute(app);
  StatisticRoute(app);
  ReceiptRoute(app);
}

export default InitialRoute;
