import mongoose from "mongoose";
import { UserDocument } from "./User.Model";
import { CategoryDocument } from "./Category.Model";
import { ProductDocument } from "./Product.Model";

export interface ReceiptDocument extends mongoose.Document {
  quantityStock: number;
  price: number;
  dateGet: Date;
  product: ProductDocument['_id'];
  user: UserDocument["_id"];
}

const ReceiptSchema = new mongoose.Schema({
  quantityStock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  dateGet: {
    type: Date,
    default: Date.now(),
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Receipt = mongoose.model("Receipt", ReceiptSchema);

export default Receipt;
