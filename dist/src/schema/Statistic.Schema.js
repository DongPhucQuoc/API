"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStatisticByMonth = exports.GetStatisticByDay = void 0;
var yup_1 = require("yup");
exports.GetStatisticByDay = (0, yup_1.object)({
    body: (0, yup_1.object)({
        dateString: (0, yup_1.string)().required("Date string is required"),
    }),
});
exports.GetStatisticByMonth = (0, yup_1.object)({
    body: (0, yup_1.object)({
        year: (0, yup_1.number)().required("Date string is required"),
    }),
});
