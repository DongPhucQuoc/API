"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetListOrderSortedSchema = exports.UpdateStatusOrderSchema = exports.GetListOrdeSchema = exports.CreateOrderSchema = void 0;
var yup_1 = require("yup");
exports.CreateOrderSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        comment: (0, yup_1.string)(),
        infoGuest: (0, yup_1.object)({
            firstName: (0, yup_1.string)()
                .required("First name is required")
                .min(2, "First name must be included 2 characters"),
            lastName: (0, yup_1.string)()
                .required("Last name is required")
                .min(2, "Last name must be included 2 characters"),
            phone: (0, yup_1.string)()
                .required("Phone is required")
                .length(10, "Phone must be included 10 numbers")
                .matches(/(84|0[3|5|7|8|9])+([0-9]{8,9})\b/, "Phone isn't match"),
            address: (0, yup_1.string)()
                .required("Address is required")
                .min(5, "Address must be included 5 characters"),
        }),
        orderDetails: (0, yup_1.array)().of((0, yup_1.object)({
            product: (0, yup_1.string)().required("Product is required"),
            quantity: (0, yup_1.number)()
                .required("Quantity is required")
                .min(1, "Min quantity is 1"),
            size: (0, yup_1.string)().required("Size is required"),
        })),
    }),
});
exports.GetListOrdeSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        page: (0, yup_1.number)().required("Page is reuqired"),
    }),
});
exports.UpdateStatusOrderSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        currentStatus: (0, yup_1.string)().required("Current status is required"),
    }),
});
exports.GetListOrderSortedSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        type: (0, yup_1.string)().required("Type is required"),
        page: (0, yup_1.number)().required("Page is required"),
    }),
});
