import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import Order, { OrderDocument } from "../models/Order.Model";
import Common from "../utils/Common";
import nodemailer from "nodemailer";
import config from "../../config/Default";

export const CreateOrder = async (input: DocumentDefinition<OrderDocument>) => {
  try {
    return await Order.create(input);
  } catch (e) {
    throw new Error("Error create Order");
  }
};

export const FindOrder = async (query: FilterQuery<OrderDocument>) => {
  return await Order.findOne(query).lean();
};

export const GetListOrder = async (query: FilterQuery<OrderDocument>) => {
  return await Order.find(query);
};

export const GetListOrderWithPage = async (
  query: FilterQuery<OrderDocument>,
  skip: number,
  limit: number
) => {
  return await Order.find(query).skip(skip).limit(limit);
};

export const UpdateOrder = async (
  query: FilterQuery<OrderDocument>,
  update: UpdateQuery<OrderDocument>,
  options: QueryOptions
) => {
  return await Order.findOneAndUpdate(query, update, options);
};

export const GetListOrderID = async (query: FilterQuery<OrderDocument>) => {
  return await Order.find(query).select("_id");
};

export const CheckStatusUpdated = (status: string) => {
  if (
    !status ||
    (status !== Common.status.WAITING && status !== Common.status.SHIPPING)
  ) {
    return false;
  }
  return true;
};

export const ReturnStatusUpdated = (status: string) => {
  if (status === Common.status.UNCONFIRMED) {
    return Common.status.WAITING;
  }
  if (status === Common.status.WAITING) {
    return Common.status.SHIPPING;
  }
  if (status === Common.status.SHIPPING) {
    return Common.status.SHIPPED;
  }
  return undefined;
};

export const StatisticOrderByMonth = async () => {
  return await Order.aggregate([
    {
      $project: {
        year: { $year: "$shippedDate" },
        month: { $month: "$shippedDate" },
        total: "$total",
      },
    },
  ]);
};

export const StatisticOrderByYear = async () => {
  return await Order.aggregate([
    {
      $project: {
        year: { $year: "$shippedDate" },
        total: "$total",
      },
    }
  ])
}

export const StatisticOrderByUserID = async (userID: string) => {
  return await Order.aggregate([
    {
      $match: { user: userID },
    },
    {
      $project: {
        month: { $month: "$shippedDate" },
        total: "$total",
      },
    },
  ]);
};

export const DeleteAllOrder = async (query: FilterQuery<OrderDocument>) => {
  return await Order.deleteMany(query);
};

export const SendMailOrder = async (orderID: string, to: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: false,
    auth: {
      user: config.mailUsername,
      pass: config.mailPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: config.mailUsername,
    to: to,
    subject: "XIN CẢM ƠN!",
    text: "Mã đơn hàng của bạn là: " + orderID,
  };

  return await transporter.sendMail(mailOptions);
};

export const CheckBySuitable = (by: string) => {
  if (by === "day" || by === "month" || by === "year") {
    return true;
  }
  return false;
};

export const TypeIsSuitable = (type: string) => {
  if (type !== "increment" && type !== "decrement") {
    return false;
  }
  return true;
};

export const GetTypeSort = (type: string) => {
  if (type === "decrement") {
    return 1;
  }
  return -1;
};

export const GetListOrderSorted = async (
  by: number,
  skip: number,
  limit: number
) => {
  return await Order.aggregate([{ $sort: { requiredDate: by } }])
    .skip(skip)
    .limit(limit);
};
