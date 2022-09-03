"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetListProductByCategorySortedByNameAndPriceSchema = exports.GetListProductSortedByNameAndPriceSchema = exports.GetListProductForOrder = exports.GetListProductSortedSchema = exports.GetListProductByCategorySchema = exports.CreateProductSchema = void 0;
var yup_1 = require("yup");
exports.CreateProductSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        name: (0, yup_1.string)()
            .required("Name product is required")
            .min(2, "Name product must be included 2 character"),
        price: (0, yup_1.number)()
            .required("Price product is required")
            .min(0, "Min price product is 0"),
        description: (0, yup_1.string)(),
        category: (0, yup_1.string)().required("Category product is required"),
    }),
});
exports.GetListProductByCategorySchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        type: (0, yup_1.string)().required("Type category is required"),
    }),
});
exports.GetListProductSortedSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        type: (0, yup_1.string)().required("Type is 'increment or decrement'"),
    }),
});
exports.GetListProductForOrder = (0, yup_1.object)({
    body: (0, yup_1.object)({
        list: (0, yup_1.array)()
            .of((0, yup_1.string)().required("Product ID is required"))
            .required("List products are required"),
    }),
});
exports.GetListProductSortedByNameAndPriceSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        typeName: (0, yup_1.string)().required("Type name is required"),
        typePrice: (0, yup_1.string)().required("Type price is required"),
    })
});
exports.GetListProductByCategorySortedByNameAndPriceSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        typeName: (0, yup_1.string)().required("Type name is required"),
        typePrice: (0, yup_1.string)().required("Type price is required"),
    }),
});
