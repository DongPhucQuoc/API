import { object, number, string } from "yup";

export const CreateReceiptSchema = object({
  body: object({
    quantityStock: number().required("Quantity in stock is required"),
    price: number().required("Price is required"),
    category: string().required("Category is required"),
    product: string().required("Product is required"),
  }),
});
