"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCartSchema = exports.DeleteListCartByID = exports.DeleteCartByID = exports.GetCartPriceSelectedSchema = exports.CreateCartSchema = void 0;
var yup_1 = require("yup");
exports.CreateCartSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        product: (0, yup_1.string)().required("Product is required"),
        quantity: (0, yup_1.number)()
            .required("Quantity is required")
            .min(1, "Min quantity is 1"),
        size: (0, yup_1.string)().required("Size is required"),
    }),
});
exports.GetCartPriceSelectedSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        carts: (0, yup_1.array)().of((0, yup_1.string)()).required("List cartsID is required"),
    }),
});
exports.DeleteCartByID = (0, yup_1.object)({
    body: (0, yup_1.object)({
        product: (0, yup_1.string)().required("ID Product is required"),
    }),
});
exports.DeleteListCartByID = (0, yup_1.object)({
    body: (0, yup_1.object)({
        carts: (0, yup_1.array)().of((0, yup_1.string)()).required("List cartsID is required"),
    }),
});
exports.UpdateCartSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        product: (0, yup_1.string)().required("ID Product is required"),
        quantity: (0, yup_1.number)().required("Quantity is required"),
        size: (0, yup_1.string)().required("Size is required"),
    }),
});
