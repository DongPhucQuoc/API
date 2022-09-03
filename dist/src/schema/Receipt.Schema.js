"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReceiptSchema = void 0;
var yup_1 = require("yup");
exports.CreateReceiptSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        quantityStock: (0, yup_1.number)().required("Quantity in stock is required"),
        price: (0, yup_1.number)().required("Price is required"),
        category: (0, yup_1.string)().required("Category is required"),
    }),
});
