"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ReceiptSchema = new mongoose_1.default.Schema({
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
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
});
var Receipt = mongoose_1.default.model("Receipt", ReceiptSchema);
exports.default = Receipt;
