import { object, string, number } from "yup";

export const GetStatisticByDay = object({
  body: object({
    dateString: string().required("Date string is required"),
  }),
});

export const GetStatisticByMonth = object({
  body: object({
    year: number().required("Date string is required"),
  }),
});
