"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var CartSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number
    },
    size: {
        type: String,
        default: "S",
        enum: ["S", "M", "L"]
    },
    isSelected: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
var Cart = mongoose_1.default.model("Cart", CartSchema);
exports.default = Cart;
