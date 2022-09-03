import { Request, Response } from "express";
import {
  CreateProduct,
  DeleteProduct,
  FindProduct,
  GetListProduct,
  GetListProductSortedByName,
  GetListProductSortedByPrice,
  UpdateProduct,
  TypeIsSuitable,
  GetTypeSort,
  GetListProductWithPage,
  GetListProductSortedByNameAndPrice,
  GetListProductByCategoryAndSortedByName,
  GetListProductByCategoryAndSortedByPrice,
  GetListProductByCategorySortedByNameAndPrice,
  GetListProductSortedByNameWithPage,
  GetListProductSortedByPriceWithPage,
} from "../services/Product.Service";
import { CreateImage, GetImagesByProductID } from "../services/Image.Service";
import { get } from "lodash";
import { FindNameCategory } from "../services/Category.Service";
import { DeleteImagesHandler } from "./Image.Controller";
import { FindCart } from "../services/Cart.Service";
import { FindOrderDetails } from "../services/OrderDetail.Service";
import Category from "../models/Category.Model";
import Product from "../models/Product.Model";
import Receipt from "../models/Receipt.Model";
import Image from "../models/Image.Model";

export const CreateProductHandler = async (req: Request, res: Response) => {
  try {
    const product = await CreateProduct(req.body);
    const idProduct = product._id;
  
    const images = await CreateImage({ ...req.body, product: idProduct });
    
    const result = await UpdateProduct(
      { _id: idProduct },
      { images: images },
      { new: true }
    );
  
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json({ error })
  }
};

export const GetProductByIDHandler = async (req: Request, res: Response) => {
  const productID = get(req, "params.id");
  if (!productID) {
    return res.status(400).json({ message: "PRODUCT ID IS REQUIRED" });
  }

  let result = await FindProduct({ _id: productID });
  if (!result) {
    return res.status(404).json({ message: "PRODUCT HAS NOT FOUND" });
  }
  const category = await FindNameCategory({ _id: result.category });
  result.category = category;

  const images = await GetImagesByProductID({ product: productID });
  result = { ...result, images: images };

  return res.status(200).json({ result });
};

export const GetListProductHandler = async (req: Request, res: Response) => {
  const list = await GetListProduct({});
  if (!list) {
    return res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" });
  }

  const result = await BodyGetResult(list);

  return res.status(200).json({ result });
};

export const GetListProductsSortedByNameHandler = async (
  req: Request,
  res: Response
) => {
  const type = req.body.type;
  if (!TypeIsSuitable(type)) {
    return res
      .status(400)
      .json({ message: "TYPE IS 'INCREMENT' OR 'DECREMENT'" });
  }

  const by = GetTypeSort(type);
  const list = await GetListProductSortedByName(by);
  if (!list) {
    return res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" });
  }

  const result = await BodyGetResultForSort(list);

  return res.status(200).json({ result });
};

export const GetListProductsSortedByNameWithPageHandler = async (
  req: Request,
  res: Response
) => {
  const page = get(req, "params.page");
  const skip = (parseInt(page) - 1)*6;
  const type = req.body.type;
  if (!TypeIsSuitable(type)) {
    return res
      .status(400)
      .json({ message: "TYPE IS 'INCREMENT' OR 'DECREMENT'" });
  }

  const by = GetTypeSort(type);
  const list = await GetListProductSortedByNameWithPage(by, skip, 6);
  if (!list) {
    return res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" });
  }

  const result = await BodyGetResultForSort(list);

  return res.status(200).json({ result });
};

export const GetListProductSortByPriceHandler = async (
  req: Request,
  res: Response
) => {
  const type = req.body.type;
  if (!TypeIsSuitable(type)) {
    return res
      .status(400)
      .json({ message: "TYPE IS 'INCREMENT' OR 'DECREMENT'" });
  }

  const by = GetTypeSort(type);
  const list = await GetListProductSortedByPrice(by);
  if (!list) {
    return res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" });
  }

  const result = await BodyGetResultForSort(list);

  return res.status(200).json({ result });
};

export const GetListProductSortByPriceWithPageHandler = async (
  req: Request,
  res: Response
) => {
  const page = get(req, "params.page");
  const skip = (parseInt(page) - 1)*6;
  const type = req.body.type;
  if (!TypeIsSuitable(type)) {
    return res
      .status(400)
      .json({ message: "TYPE IS 'INCREMENT' OR 'DECREMENT'" });
  }

  const by = GetTypeSort(type);
  const list = await GetListProductSortedByPriceWithPage(by, skip, 6);
  if (!list) {
    return res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" });
  }

  const result = await BodyGetResultForSort(list);

  return res.status(200).json({ result });
};

export const GetListProductByCategorySortedByNameHandler = async (
  req: Request,
  res: Response
) => {
  const idCategory = get(req, "params.idCategory");
  const type = req.body.type;
  if (!TypeIsSuitable(type)) {
    return res
      .status(400)
      .json({ message: "TYPE IS 'INCREMENT' OR 'DECREMENT'" });
  }

  const by = GetTypeSort(type);
  const list = await GetListProductByCategoryAndSortedByName(idCategory, by);
  if (!list) {
    return res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" });
  }

  const result = await BodyGetResultForSort(list);

  return res.status(200).json({ result });
};

export const GetListProductByCategorySortedByPriceHandler = async (
  req: Request,
  res: Response
) => {
  const idCategory = get(req, "params.idCategory");
  const type = req.body.type;
  if (!TypeIsSuitable(type)) {
    return res
      .status(400)
      .json({ message: "TYPE IS 'INCREMENT' OR 'DECREMENT'" });
  }

  const by = GetTypeSort(type);
  const list = await GetListProductByCategoryAndSortedByPrice(idCategory, by);
  if (!list) {
    return res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" });
  }

  const result = await BodyGetResultForSort(list);
  
  return res.status(200).json({ result });
};

export const GetListProductByCategorySortedByNameAndPriceHandler = async (
  req: Request,
  res: Response
) => {
  const idCategory = get(req, "params.idCategory");
  const typeName = req.body.typeName;
  const typePrice = req.body.typePrice;
  if (!TypeIsSuitable(typeName) || !TypeIsSuitable(typePrice)) {
    return res
      .status(400)
      .json({ message: "TYPE IS 'INCREMENT' OR 'DECREMENT'" });
  }

  const byName = GetTypeSort(typeName);
  const byPrice = GetTypeSort(typePrice);
  const list = await GetListProductByCategorySortedByNameAndPrice(
    idCategory,
    byName,
    byPrice
  );
  if (!list) {
    return res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" });
  }

  const result = await BodyGetResultForSort(list);

  return res.status(200).json({ result });
};

export const GetListProductsByCategoryHandler = async (
  req: Request,
  res: Response
) => {
  const category = get(req, "params.category");
  if (!category) {
    return res.status(400).json({ message: "TYPE PRODUCT IS REQUIRED" });
  }

  const list = await GetListProduct({ category: category });

  if (!list) {
    res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" });
  }

  const result = await BodyGetResult(list);

  return res.status(200).json({ result });
};

export const GetListProductSortedByNameAndPriceHandler = async (
  req: Request,
  res: Response
) => {
  const typeName = req.body.typeName;
  const typePrice = req.body.typePrice;
  if (!TypeIsSuitable(typeName) || !TypeIsSuitable(typePrice)) {
    return res
      .status(400)
      .json({ message: "TYPE IS 'INCREMENT' OR 'DECREMENT'" });
  }

  const byName = GetTypeSort(typeName);
  const byPrice = GetTypeSort(typePrice);

  const list = await GetListProductSortedByNameAndPrice(byName, byPrice);
  if (!list) {
    return res.status(404).json({ message: "NO PRODUCTS HAVE BEEN FOUND" });
  }

  const result = await BodyGetResultForSort(list);

  return res.status(200).json({ result });
};

export const GetListProductForOrderHandler = async (
  req: Request,
  res: Response
) => {
  const list = req.body.list;

  let result = [];
  for (let i = 0; i < list.length; i++) {
    const product = await FindProduct({ _id: list[i] });
    if (!product) {
      return res.status(404).json({ message: "PRODUCT HAS NOT FOUND" });
    }
    result.push(product);
  }

  return res.status(200).json({ result });
};

export const GetListProductWithPageHandler = async (
  req: Request,
  res: Response
) => {
  const page = get(req, "params.page");
  if (parseInt(page) <= 0) {
    return res.status(400).json({ message: "Page must be bigger than 0" });
  }

  const skip = (parseInt(page) - 1) * 6;
  const list = await GetListProductWithPage({}, skip, 6);
  if (list.length === 0) {
    return res.status(200).json({ result: [] });
  }

  const result = await BodyGetResult(list);

  return res.status(200).json({ result });
};

export const GetLengthOfProductHandler = async (
  req: Request,
  res: Response
) => {
  const list = await GetListProduct({});
  const result = list.length;
  return res.status(200).json({ result });
};

export const GetLengthOfProductWithCategoryHandler = async (
  req: Request,
  res: Response
) => {
  const category = get(req, "params.category");
  const list = await GetListProduct({ category: category });
  return res.status(200).json({ result: list.length });
};

export const UpdateProductHandler = async (req: Request, res: Response) => {
  const productID = get(req, "params.id");
  if (!productID) {
    return res.status(400).json({ message: "PRODUCT ID IS REQUIRED" });
  }

  const product = await FindProduct({ _id: productID });
  if (!product) {
    return res.status(404).json({ message: "PRODUCT HAS NOT FOUND" });
  }

  const result = await UpdateProduct({ _id: productID }, req.body, {
    new: true,
  });

  return res.status(200).json({ result });
};

export const DeleteProductByIDHandler = async (req: Request, res: Response) => {
  const productID = get(req, "params.id");
  if (!productID) {
    return res.status(400).json({ message: "ID PRODUCT IS REQUIRED" });
  }

  const cart = await FindCart({ product: productID });
  const orderDetail = await FindOrderDetails({ product: productID });
  if (cart || orderDetail) {
    return res.status(405).json({ message: "CAN NOT REMOVE THIS PRODUCT" });
  }

  const product = await FindProduct({ _id: productID });
  if (!product) {
    return res.sendStatus(404);
  }

  await DeleteImagesHandler(productID);
  await DeleteProduct({ _id: productID });

  return res.status(200).json({ message: "DELETE SUCCESSFUL" });
};

export const SupportGetProductByID = async (
  req: Request,
  res: Response,
  productID: string
) => {
  let result = await FindProduct({ _id: productID });
  if (!result) {
    return res.status(404).json({ message: "PRODUCT HAS NOT FOUND" });
  }
  const category = await FindNameCategory({ _id: result.category });
  result.category = category;

  const images = await GetImagesByProductID({ product: productID });
  result = { ...result, images: images };

  return result;
};

const BodyGetResult = async (result: any) => {
  const  categoryIds = []
  const productIds = []

  for (let i = 0; i < result.length; i++) {
    const idCategory = result[i].category;
    const idProduct = result[i]._id;

    categoryIds.push(idCategory)
    productIds.push(idProduct)
    // const nameCategory = await FindNameCategory({ _id: idCategory });
    // const images = await GetImagesByProductID({ product: idProduct });

    // result[i] = { ...result[i]._doc, category: nameCategory, images: images };
  }

  const [categories, images, receipts] = await Promise.all([
    Category.find({ _id: { $in: categoryIds }}),
    Image.find({ product: { $in: productIds }}),
    Receipt.find({ product: { $in: productIds }})
  ])

  const categoryObj: any = {}
  const imageObj: any = {}
  const receiptObj: any = {}
  
  for (const image of images) {
    imageObj[image.product] = image
  }

  for (const category of categories) {
    categoryObj[category._id] = category
  }

  for (const receipt of receipts) {
    receiptObj[receipt.product] = receipt
  }

  const newResult: any = []
  for (let i = 0; i < result.length; i++) {
    const item = result[i]
    newResult[i] = { ...item._doc, images: [imageObj[item._id]], receipt: [receiptObj[item._id]], category: [categoryObj[item.category]] }
  }

  return newResult;
};

const BodyGetResultForSort = async (result: any) => {
  for (let i = 0; i < result.length; i++) {
    const idCategory = result[i].category;
    const idProduct = result[i]._id;
    const nameCategory = await FindNameCategory({ _id: idCategory });
    const images = await GetImagesByProductID({ product: idProduct });
    result[i] = { ...result[i], category: nameCategory, images: images };
  }

  return result;
};
