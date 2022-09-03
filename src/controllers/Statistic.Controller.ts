import { Request, Response } from "express";
import {
  GetListOrder,
  StatisticOrderByMonth,
  StatisticOrderByUserID,
  StatisticOrderByYear,
} from "../services/Order.Service";
import { GetUserID } from "../services/User.Service";

export const StatisticOrderByDayHandler = async (
  req: Request,
  res: Response
) => {
  const dateString = req.body.dateString;
  const date = new Date(dateString);
  const cdd = date.getDate();
  const cmm = date.getMonth() + 1;
  const cyy = date.getFullYear();

  let count = 0;
  let total = 0;

  const list = await GetListOrder({});
  for (let i = 0; i < list.length; i++) {
    const shippedDate = new Date(list[i].shippedDate);
    const dd = shippedDate.getDate();
    const mm = shippedDate.getMonth() + 1;
    const yy = shippedDate.getFullYear();
    if (cdd === dd && cmm === mm && cyy === yy) {
      count = count + 1;
      total = total + list[i].total;
    }
  }

  return res.status(200).json({ result: { total, count } });
};

export const StatisticOrderByMonthHandler = async (
  req: Request,
  res: Response
) => {
  const year = req.body.year;
  const statistic = await StatisticOrderByMonth();
  let result: any = [
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

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < statistic.length; j++) {
      if (statistic[j].year === year && result[i].month === statistic[j].month) {
        result[i].total += statistic[j].total;
      }
    }
  }

  return res.status(200).json({ result });
};

export const StatisticOrderByYearHandler = async (
  req: Request,
  res: Response
) => {
  const statistic = await StatisticOrderByYear();

  let result: any = [
    { year: 2021, total: 0 },
    { year: 2022, total: 0 },
    { year: 2023, total: 0 },
    { year: 2024, total: 0 },
    { year: 2025, total: 0 },
  ];

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < statistic.length; j++) {
      if (result[i].year === statistic[j].year) {
        result[i].total += statistic[i].total;
      }
    }
  }

  return res.status(200).json({ result });
};

export const StatisticOrderByUserIDHandler = async (
  req: Request,
  res: Response
) => {
  const userID = await GetUserID(req);
  const statistic = await StatisticOrderByUserID(userID);
  let result: any = [
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

  let totalBought = 0;
  for (let i = 0; i < statistic.length; i++) {
    result[statistic[i].month - 1].total =
      result[statistic[i].month - 1].total + statistic[i].total;
    totalBought = totalBought + statistic[i].total;
  }
  result[result.length - 1].totalBought = totalBought;

  return res.status(200).json({ result });
};
