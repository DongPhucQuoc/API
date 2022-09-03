import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import Receipt, { ReceiptDocument } from "../models/Receipt.Model";

export const CreateReceipt = async (
  input: DocumentDefinition<ReceiptDocument>
) => {
  try {
    return await Receipt.create(input);
  } catch (e) {
    throw new Error("Error create Receipt");
  }
};

export const FindReceipt = async (query: FilterQuery<ReceiptDocument>) => {
  return await Receipt.findOne(query);
};

export const FindAllReceipt = async (query: FilterQuery<ReceiptDocument>) => {
  return await Receipt.find(query);
};

export const GetListReceipt = async () => {
  return await Receipt.aggregate([]);
};

export const UpdateReceipt = async (
  query: FilterQuery<ReceiptDocument>,
  update: UpdateQuery<ReceiptDocument>,
  options: QueryOptions
) => {
  return await Receipt.findOneAndUpdate(query, update, options);
};

export const DeleteReceipt = async (query: FilterQuery<ReceiptDocument>) => {
  return await Receipt.findOneAndRemove(query);
};
