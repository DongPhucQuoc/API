"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPassword = exports.ComparePassword = exports.HashPassword = exports.GetRoleUserLogined = exports.GetUserID = exports.UpdateUser = exports.FindUser = exports.ValidatePassword = exports.CreateUser = void 0;
var lodash_1 = require("lodash");
var bcrypt_1 = __importDefault(require("bcrypt"));
var Default_1 = __importDefault(require("../../config/Default"));
var User_Model_1 = __importDefault(require("../models/User.Model"));
var uuid_1 = require("uuid");
var nodemailer_1 = __importDefault(require("nodemailer"));
var CreateUser = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_Model_1.default.create(input)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                throw new Error("Error create user");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.CreateUser = CreateUser;
var ValidatePassword = function (_a) {
    var email = _a.email, password = _a.password;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, isValid;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, User_Model_1.default.findOne({ email: email })];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, user.comparePassword(password)];
                case 2:
                    isValid = _b.sent();
                    if (!isValid) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, (0, lodash_1.omit)(user.toJSON(), "password")];
            }
        });
    });
};
exports.ValidatePassword = ValidatePassword;
var FindUser = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_Model_1.default.findOne(query).lean()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.FindUser = FindUser;
var UpdateUser = function (query, update, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_Model_1.default.findOneAndUpdate(query, update, options)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.UpdateUser = UpdateUser;
var GetUserID = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, userID;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.user.email;
                return [4 /*yield*/, (0, exports.FindUser)({ email: email })];
            case 1:
                user = _a.sent();
                userID = user === null || user === void 0 ? void 0 : user._id;
                return [2 /*return*/, userID];
        }
    });
}); };
exports.GetUserID = GetUserID;
var GetRoleUserLogined = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.GetUserID)(req)];
            case 1:
                userID = _a.sent();
                return [4 /*yield*/, (0, exports.FindUser)({ _id: userID })];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, user.role];
        }
    });
}); };
exports.GetRoleUserLogined = GetRoleUserLogined;
var HashPassword = function (password) { return __awaiter(void 0, void 0, void 0, function () {
    var salt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bcrypt_1.default.genSalt(Default_1.default.saltHashPassword)];
            case 1:
                salt = _a.sent();
                return [2 /*return*/, bcrypt_1.default.hashSync(password, salt)];
        }
    });
}); };
exports.HashPassword = HashPassword;
var ComparePassword = function (newPassword, cNewPassword) {
    if (newPassword !== cNewPassword) {
        return false;
    }
    return true;
};
exports.ComparePassword = ComparePassword;
var ForgotPassword = function (to) { return __awaiter(void 0, void 0, void 0, function () {
    var newPassword, transporter, mailOptions, hashPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newPassword = (0, uuid_1.v4)();
                transporter = nodemailer_1.default.createTransport({
                    service: "Gmail",
                    port: 465,
                    secure: false,
                    auth: {
                        user: Default_1.default.mailUsername,
                        pass: Default_1.default.mailPassword,
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                });
                mailOptions = {
                    from: Default_1.default.mailUsername,
                    to: to,
                    subject: "Forgot password from COFFEE",
                    text: "New password is: " + newPassword,
                };
                return [4 /*yield*/, (0, exports.HashPassword)(newPassword)];
            case 1:
                hashPassword = _a.sent();
                return [4 /*yield*/, (0, exports.UpdateUser)({ email: to }, { password: hashPassword }, { new: false })];
            case 2:
                _a.sent();
                return [4 /*yield*/, transporter.sendMail(mailOptions)];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.ForgotPassword = ForgotPassword;
