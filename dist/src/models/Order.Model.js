"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Common_1 = __importDefault(require("../utils/Common"));
var infoGuest = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});
var OrderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        default: Common_1.default.status.UNCONFIRMED,
        enum: Object.values(Common_1.default.status),
    },
    comment: {
        type: String
    },
    requiredDate: {
        type: Date,
        default: Date.now()
    },
    shippedDate: {
        type: Date,
        default: Date.now()
    },
    updatedBy: {
        type: String
    },
    shipFee: {
        type: Number,
        default: Common_1.default.shipFee
    },
    total: {
        type: Number
    },
    paid: {
        type: Boolean,
        default: false
    },
    infoGuest: {
        type: infoGuest,
        required: true
    }
});
var Order = mongoose_1.default.model("Order", OrderSchema);
exports.default = Order;
