"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Common_1 = __importDefault(require("../utils/Common"));
var OrderDetailSchema = new mongoose_1.default.Schema({
    order: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Order"
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    size: {
        type: String,
        required: true,
        default: Common_1.default.size_product.S,
        enum: Object.values(Common_1.default.size_product)
    },
    price: {
        type: Number,
    },
    note: {
        type: String
    }
}, {
    timestamps: true
});
var OrderDetail = mongoose_1.default.model("OrderDetail", OrderDetailSchema);
exports.default = OrderDetail;
