"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordSchema = exports.ChangePasswordUserSchema = exports.CreateUserSchema = void 0;
var yup_1 = require("yup");
exports.CreateUserSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        firstName: (0, yup_1.string)()
            .required("First name is requried")
            .min(2, "First name must be included 2 characters"),
        lastName: (0, yup_1.string)()
            .required("Last name is required")
            .min(2, "Last name must be included 2 characters"),
        address: (0, yup_1.string)()
            .required("Address is required")
            .min(5, "Address must be included 5 characters"),
        phone: (0, yup_1.string)()
            .required("Phone is required")
            .matches(/(84|0[3|5|7|8|9])+([0-9]{8,9})\b/, "Phone isn't match"),
        email: (0, yup_1.string)()
            .required("Email is required")
            .matches(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email isn't match"),
        password: (0, yup_1.string)()
            .required("Password is required")
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "Password must be included 8 characters with uppercase, lowercase and number"),
        cPassword: (0, yup_1.string)()
            .required("Password confirm is required")
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "Password must be included 8 characters with uppercase, lowercase and number"),
    }),
});
exports.ChangePasswordUserSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        password: (0, yup_1.string)().required("Old password is required"),
        newPassword: (0, yup_1.string)()
            .required("New password is required")
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "New password is not suitable"),
        cNewPassword: (0, yup_1.string)()
            .required("New password confirm í required")
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "New password confirm is not suitable"),
    }),
});
exports.ForgotPasswordSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        email: (0, yup_1.string)()
            .required("Email is required")
            .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email isn't match"),
    }),
});
