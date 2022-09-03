"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPricePaypalSchema = exports.CapturePaypalSchema = exports.CreatePaypalSchema = void 0;
var yup_1 = require("yup");
exports.CreatePaypalSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        orderID: (0, yup_1.string)().required("Order id is required"),
        infoGuest: (0, yup_1.object)({
            firstName: (0, yup_1.string)().required("First name is required"),
            lastName: (0, yup_1.string)().required("Last name is required"),
            phone: (0, yup_1.string)().required("Phone is required"),
            address: (0, yup_1.string)().required("Address is required"),
        }),
        orderDetails: (0, yup_1.array)().of((0, yup_1.object)({
            product: (0, yup_1.string)().required("Product is required"),
            quantity: (0, yup_1.number)()
                .required("Quantity is required")
                .min(1, "Min quantity is 1"),
            size: (0, yup_1.string)().required("Size is required"),
        }).required("Order details are required")),
    }),
});
exports.CapturePaypalSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        id: (0, yup_1.string)().required("ID Paypal is required"),
    }),
});
exports.GetPricePaypalSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        list: (0, yup_1.array)()
            .of((0, yup_1.object)({
            product: (0, yup_1.string)().required("id product is required"),
            quantity: (0, yup_1.number)().required("quantity is required"),
            size: (0, yup_1.string)().required("Size is required"),
        }))
            .required("List id products are required"),
    }),
});
