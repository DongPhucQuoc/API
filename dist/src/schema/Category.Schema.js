"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetListCategorySortedSchema = exports.CreateCategorySchema = void 0;
var yup_1 = require("yup");
exports.CreateCategorySchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        name: (0, yup_1.string)()
            .required("Name category is required")
            .min(2, "Name category must be included 2 characters"),
    }),
});
exports.GetListCategorySortedSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        type: (0, yup_1.string)().required("Type is 'increment or decrement'"),
    })
});
