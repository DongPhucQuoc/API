import { Request, Response } from "express";
import { get } from "lodash";
import Product from "../models/Product.Model";
import Receipt from "../models/Receipt.Model";
import User from "../models/User.Model";
import { FindCategory } from "../services/Category.Service";
import { FindProduct } from "../services/Product.Service";
import {
  DeleteReceipt,
  FindReceipt,
  FindAllReceipt,
  UpdateReceipt,
} from "../services/Receipt.Service";
import { FindUser, GetUserID } from "../services/User.Service";

export const CheckReceiptID = async (res: Response, receiptID: string) => {
  const receipt = await FindReceipt({ _id: receiptID });
  if (!receipt) {
    return res.status(404).json({ message: "RECEIPT IS NOT FOUND" });
  }
  return receipt;
};

export const CreateReceiptHandler = async (req: Request, res: Response) => {
  const { product, category } = req.body;

  const producted = await Product.findOne({ name: product })
  
  if (!producted) {
    const { price, quantityStock } = req.body

    const [newProduct, userId] = await Promise.all([Product.create({ name: product, category }), GetUserID(req)])
    const newReceipt = await Receipt.create({ product: newProduct._id, price, quantityStock, user: userId })

    return res.status(200).json({ result: newReceipt });
  }

  const [userId, receipt] = await Promise.all([GetUserID(req), FindReceipt({ product: producted._id })])

  const quantityStock = parseInt(receipt.quantityStock) + parseInt(req.body.quantityStock);
  const price = (parseInt(receipt.price.toString()) + parseInt(req.body.price)) / 2;

  const result = await UpdateReceipt(
    { _id: receipt._id },
    { quantityStock: quantityStock, user: userId, price: price },
    { new: true }
  );

  return res.status(200).json({ result });
};

export const UpdateReceiptHandler = async (req: Request, res: Response) => {
  const receiptID = get(req, "params.id");
  await CheckReceiptID(res, receiptID);

  const userID = await GetUserID(req);
  const result = await UpdateReceipt(
    { _id: receiptID },
    { ...req.body, user: userID },
    { new: true }
  );

  return res.status(200).json({ result });
};

export const DeleteReceiptHandler = async (req: Request, res: Response) => {
  const receiptID = get(req, "params.id");
  await CheckReceiptID(res, receiptID);
  const receipt = await DeleteReceipt({ _id: receiptID });
  if (receipt.quantityStock > 0) {
    return res.status(405).json({ message: "CAN'T REMOVE THIS RECEIPT" });
  }
  return res.status(200).json({ message: "DELETE SUCCESSFUL" });
};

export const GetListReceiptHandler = async (req: Request, res: Response) => {
  const receipts = await FindAllReceipt({});

  const productIds = []
  const userIds = []
  for (const receipt of receipts) {
    const { product, user } = receipt

    productIds.push(product)
    userIds.push(user)
  }

  const [products, users] = await Promise.all([
    Product.find({ _id: { $in: productIds }}),
    User.find({ _id: { $in: userIds }})
  ])

  const productObj: any = {}
  const userObj: any = {}

  for (const product of products) {
    productObj[product._id] = product
  }

  for (const user of users) {
    userObj[user._id] = user
  }

  const result: any = []
  for (let i = 0; i < receipts.length; i++) {
    const receipt = receipts[i]._doc
    const { user, product } = receipt
    result[i] = { ...receipt, user: [userObj[user]], product: [productObj[product]]}
  } 
 
  return res.status(200).json({ result });
};

export const GetReceiptByIDHandler = async (req: Request, res: Response) => {
  const receiptID = get(req, "params.id");
  const receipt: any = await CheckReceiptID(res, receiptID);
  const user = await FindUser({ _id: receipt.user });
  const name = user?.lastName + " " + user?.firstName;
  const result = { ...receipt._doc, user: name };
  return res.status(200).json({ result });
};
