  import { Request, Response } from "express";
  import { GetImagesByProductID } from "../services/Image.Service";
  import { OrderDetailDocument } from "../models/OrderDetail.Model";
  import {
    CreateOrderDetail,
    UpdateOrderDetail,
    GetListOrderDetails,
    DeleteAllOrderDetails,
  } from "../services/OrderDetail.Service";
  import {
    CreateOrder,
    FindOrder,
    GetListOrder,
    GetListOrderID,
    UpdateOrder,
    SendMailOrder,
    ReturnStatusUpdated,
    GetTypeSort,
    TypeIsSuitable,
    GetListOrderSorted,
    GetListOrderWithPage,
  } from "../services/Order.Service";
  import { FindUser, GetUserID } from "../services/User.Service";
  import Common from "../utils/Common";
  import { get } from "lodash";
  import { FindProduct } from "../services/Product.Service";
  import { GetPriceBySize } from "../services/Cart.Service";
  import { FindCategory } from "../services/Category.Service";
  import { FindReceipt, UpdateReceipt } from "../services/Receipt.Service";

  export const CreateOrderHandler = async (req: Request, res: Response) => {
    const userID = await GetUserID(req);
    const order = await CreateOrder({ ...req.body, user: userID });

    const orderID = order._id;
    const dataOrderDetails = req.body.orderDetails;

    const provider = await DecrementQuantityStock(dataOrderDetails);
    if (!provider) {
      return res.status(400).json({ message: "NOT ENOUGH MATERIAL" });
    }

    const priceDetails = await CreateOrderDetailHandler(
      dataOrderDetails,
      orderID
    );

    const total = priceDetails + order.shipFee;
    let result = await UpdateOrder(
      { _id: orderID },
      { total: total },
      { new: true }
    );

    //@ts-ignore
    result = { ...order._doc, orderDetails: { ...dataOrderDetails } };

    //@ts-ignore
    const email = await SendMailOrder(orderID, req.user.email);
    if (!email) {
      console.log("Can't send email");
    }

    return res.status(200).json({ result });
  };

  const GetLengthOrders = async () => {
    const result: any = await GetListOrder({});
    return result.length;
  };

  export const GetListOrderHandler = async (req: Request, res: Response) => {
    const page = get(req, "params.page");
    if (page < 1) {
      return res.status(400).json({ message: "PAGE MUST BE BIGGER THEN 0 " });
    }

    const skip = (parseInt(page) - 1) * 6;

    const listOrders = await GetListOrderWithPage({}, skip, 6);
    if (!listOrders) {
      return res.status(404).json({ message: "NO ORDERS HAVE FOUND" });
    }

    const length = await GetLengthOrders();
    const result = await BodyGetListOrder(res, listOrders);

    return res.status(200).json({ result, length });
  };

  export const GetListOrderSortedHandler = async (
    req: Request,
    res: Response
  ) => {};

  export const GetListOrderOfOneHandler = async (req: Request, res: Response) => {
    const userID = await GetUserID(req);
    const listOrderIDs = await GetListOrderID({ user: userID });

    if (!listOrderIDs || listOrderIDs.length === 0) {
      return res.status(404).json({ message: "LIST ORDERS HAVE NOT FOUND" });
    }

    const result = await BodyGetListOrderForUser(listOrderIDs);

    return res.status(200).json({ result });
  };

  export const GetListOrderTrackingByStatusHandler = async (
    req: Request,
    res: Response
  ) => {
    const status = get(req, "params.status");
    if (!status) {
      return res.status(400).json({ message: "ORDER STATUS IS REQUIRED" });
    }

    const userID = await GetUserID(req);

    const listOrderIDs = await GetListOrderID({ user: userID, status: status });
    if (!listOrderIDs) {
      return res.status(404).json({ message: "LIST ORDER IS EMPTY" });
    }

    const result = await BodyGetListOrderForUser(listOrderIDs);

    return res.status(200).json({ result });
  };

  export const GetListOrderByStatusHandler = async (
    req: Request,
    res: Response
  ) => {
    const status = get(req, "params.status");
    if (!status) {
      return res.status(400).json({ message: "STATUS IS REQUIRED" });
    }

    const listOrders = await GetListOrder({ status: status });
    if (!listOrders) {
      return res.status(404).json({ message: "NO ORDERS HAVE FOUND" });
    }

    const arrOrders = Object.values(listOrders);
    const result = await BodyGetListOrderForUser(arrOrders);

    return res.status(200).json({ result });
  };

  export const ConfirmOrderHandler = async (req: Request, res: Response) => {
    const orderID = get(req, "params.id");
    if (!orderID) {
      return res.status(400).json({ message: "ID ORDER IS REQUIRED" });
    }

    const order = await FindOrder({ _id: orderID });
    if (!order) {
      return res.status(404).json({ message: "ORDER HAS NOT FOUND" });
    }

    const orderStatus = order.status;
    if (orderStatus !== Common.status.UNCONFIRMED) {
      return res.status(400).json({ message: "CAN'T UPDATE STATUS THIS ORDER" });
    }

    const EditerLogined = await GetUserID(req);

    const result = await UpdateOrder(
      { _id: orderID },
      { status: Common.status.WAITING, updatedBy: EditerLogined },
      { new: false }
    );

    return res.status(200).json({ result });
  };

  export const SetOrderIsPaidHandler = async (req: Request, res: Response) => {
    const orderID = get(req, "params.id");
    if (!orderID) {
      return res.status(400).json({ message: "ID ORDER IS REQUIRED" });
    }

    const order = await FindOrder({ _id: orderID });
    if (!order) {
      return res.status(404).json({ message: "ORDER HAS NOT FOUND" });
    }

    const result = await UpdateOrder(
      { _id: orderID },
      { paid: true, shippedDate: new Date() },
      { new: false }
    );

    return res.status(200).json({ result });
  };

  export const GetListOrderSortedHander = async (req: Request, res: Response) => {
    const type = req.body.type;
    const page = req.body.page;

    const skip = (parseInt(page) - 1) * 6;
    if (!TypeIsSuitable(type)) {
      return res
        .status(400)
        .json({ message: "TYPE IS 'INCREMENT' OR 'DECREMENT'" });
    }

    const by = GetTypeSort(type);
    const list = await GetListOrderSorted(by, skip, 6);
    if (!list) {
      return res.status(404).json({ message: "NO ORDERS HAVE BEEN FOUND" });
    }
    const length = await GetLengthOrders();

    return res.status(200).json({ result: list, length });
  };

  export const CancelOrderHandler = async (req: Request, res: Response) => {
    const orderID = get(req, "params.id");
    if (!orderID) {
      return res.status(400).json({ message: "ID ORDER IS REQUIRED" });
    }

    const order = await FindOrder({ _id: orderID });
    if (!order) {
      return res.status(404).json({ message: "ORDER HAS NOT FOUND" });
    }

    if (
      order.status != Common.status.WAITING &&
      order.status != Common.status.SHIPPING
    ) {
      return res
        .status(400)
        .json({
          message: "CAN'T CANCEL THIS ORDER",
          status: order.status,
          status2: Common.status.SHIPPING,
        });
    }

    const result = await UpdateOrder(
      { _id: orderID },
      { status: Common.status.CANCELED },
      { new: false }
    );

    const orderDetails: any = await GetListOrderDetails({ order: orderID });
    for (let i = 0; i < orderDetails.length; i++) {
      const product: any = await FindProduct({ _id: orderDetails[i].product });
      const receipt: any = await FindReceipt({ category: product.category });
      const quantityStock =
        GamMake(orderDetails[i].size) * parseInt(orderDetails[i].quantity) +
        parseInt(receipt.quantityStock);
      await UpdateReceipt(
        { _id: receipt._id },
        { quantityStock: quantityStock },
        { new: false }
      );
    }

    return res.status(200).json({ result });
  };

  export const UpdateStatusOrderHandler = async (req: Request, res: Response) => {
    const orderID = get(req, "params.id");
    if (!orderID) {
      return res.status(400).json({ message: "ID ORDER IS REQUIRED" });
    }

    const order = await FindOrder({ _id: orderID });
    if (!order) {
      return res.status(404).json({ message: "ORDER HAS NOT FOUND" });
    }

    if (
      order.status !== Common.status.UNCONFIRMED &&
      order.status !== Common.status.WAITING &&
      order.status !== Common.status.SHIPPING
    ) {
      return res
        .status(400)
        .json({ message: "THIS ORDER IS NOT ALLOWED UPDATE" });
    }

    const statusUpdated = ReturnStatusUpdated(order.status);

    const EditerLogined = await GetUserID(req);

    const result = await UpdateOrder(
      { _id: orderID },
      { status: statusUpdated, updatedBy: EditerLogined },
      { new: false }
    );
    return res.status(200).json({ result });
  };

  export const CreateOrderDetailHandler = async (
    data: Array<OrderDetailDocument>,
    orderID: string
  ) => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      const orderDetail = {
        order: orderID,
        product: data[i].product,
        quantity: data[i].quantity,
        size: data[i].size,
        note: data[i].note,
      };
      //@ts-ignore
      const detail = await CreateOrderDetail(orderDetail);

      const product = await FindProduct({ _id: data[i].product });
      const price =
        (product.price + GetPriceBySize(data[i].size)) * data[i].quantity;
      await UpdateOrderDetail(
        { _id: detail._id },
        { price: price },
        { new: true }
      );
      total = total + price;
    }
    return total;
  };

  const GamMake = (size: string) => {
    if (size === "S") {
      return 200;
    }
    if (size === "M") {
      return 250;
    }
    return 300;
  };

  export const DecrementQuantityStock = async (orderDetails: any) => {
    for (let i = 0; i < orderDetails.length; i++) {
      const productID = orderDetails[i].product;
      // const gamMake =
      //   GamMake(orderDetails[i].size) * parseInt(orderDetails[i].quantity);
      const product = await FindProduct({ _id: productID });
      const receipt = await FindReceipt({ product: productID });
      const existGam = parseInt(receipt.quantityStock) - orderDetails[i].quantity;
      if (existGam < 0) {
        return false;
      }
      await UpdateReceipt(
        { _id: receipt._id },
        { quantityStock: existGam },
        { new: false }
      );
    }

    return true;
  };

  const BodyGetListOrderForUser = async (listOrderIDs: any[]) => {
    let result: any = [];
    for (let i = 0; i < listOrderIDs.length; i++) {
      const order = await FindOrder({ _id: listOrderIDs[i] });
      let details: any = await GetListOrderDetails({ order: listOrderIDs[i] });
      for (let i = 0; i < details.length; i++) {
        //@ts-ignore
        const product = await FindProduct({ _id: details[i].product });
        const images = await GetImagesByProductID({
          product: details[i].product,
        });
        details[i] = {
          ...details[i]._doc,
          product: { ...product, images: images },
        };
      }

      result = [...result, { ...order, orderDetails: [...details] }];
    }

    return result;
  };

  const BodyGetListOrder = async (res: Response, listOrders: any) => {
    let result: any = [];

    const arrOrders: any = Object.values(listOrders);
    for (let i = 0; i < arrOrders.length; i++) {
      const orderID = arrOrders[i]._id;
      const order = await FindOrder({ _id: orderID });
      const details = await GetListOrderDetails({ order: orderID });

      if (!order) return res.status(404).json({ message: "ORDER HAS NOT FOUND" });
      order.updatedBy = await FindUser({ _id: order.updatedBy });

      result = [...result, { ...order, orderDetails: [...details] }];
    }

    return result;
  };

  export const DeleteAllOrderHandler = async (req: Request, res: Response) => {
    await DeleteAllOrderDetails({});
    return res.sendStatus(200);
  };
