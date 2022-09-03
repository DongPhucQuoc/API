"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.CreateAdminHandler = exports.ForgotPasswordHandler = exports.ChangePasswordUserHandler = exports.UpdateProfileUserHandler = exports.GetProfileUserHandler = exports.CreateStaffHandler = exports.CreateUserHandler = void 0;
var lodash_1 = require("lodash");
var User_Service_1 = require("../services/User.Service");
var Common_1 = __importDefault(require("../utils/Common"));
var CreateUserHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, User_Service_1.CreateUser)(req.body)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.send((0, lodash_1.omit)(user.toJSON(), "password"))];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                return [2 /*return*/, res.sendStatus(409)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.CreateUserHandler = CreateUserHandler;
var CreateStaffHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, User_Service_1.CreateUser)(__assign(__assign({}, req.body), { role: "staff" }))];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "SUCCESSFUL" })];
        }
    });
}); };
exports.CreateStaffHandler = CreateStaffHandler;
var GetProfileUserHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.user.email;
                return [4 /*yield*/, (0, User_Service_1.FindUser)({ email: email })];
            case 1:
                result = _a.sent();
                if (!result) {
                    return [2 /*return*/, res.status(404).json({ message: "USER HAS NOT FOUND" })];
                }
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.GetProfileUserHandler = GetProfileUserHandler;
var UpdateProfileUserHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, user, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, User_Service_1.GetUserID)(req)];
            case 1:
                userID = _a.sent();
                return [4 /*yield*/, (0, User_Service_1.FindUser)({ _id: userID })];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: "USER HAS NOT FOUND" })];
                }
                return [4 /*yield*/, (0, User_Service_1.UpdateUser)({ _id: userID }, req.body, { new: false })];
            case 3:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.UpdateProfileUserHandler = UpdateProfileUserHandler;
var ChangePasswordUserHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hash, userID, user, newPassword, cNewPassword, check, hashNewPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, User_Service_1.HashPassword)(req.body.password)];
            case 1:
                hash = _a.sent();
                return [4 /*yield*/, (0, User_Service_1.GetUserID)(req)];
            case 2:
                userID = _a.sent();
                user = (0, User_Service_1.FindUser)({ _id: userID, password: hash });
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ message: "PASSWORD IS NOT MATCHES" })];
                }
                newPassword = req.body.newPassword;
                cNewPassword = req.body.cNewPassword;
                check = (0, User_Service_1.ComparePassword)(newPassword, cNewPassword);
                if (!check) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "NEW PASSWROD AND NEW PASSWORD CONFIRM AREN'T MATCH" })];
                }
                return [4 /*yield*/, (0, User_Service_1.HashPassword)(newPassword)];
            case 3:
                hashNewPassword = _a.sent();
                return [4 /*yield*/, (0, User_Service_1.UpdateUser)({ _id: userID }, { password: hashNewPassword }, { new: false })];
            case 4:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "SUCCESSFUL" })];
        }
    });
}); };
exports.ChangePasswordUserHandler = ChangePasswordUserHandler;
var ForgotPasswordHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                return [4 /*yield*/, (0, User_Service_1.FindUser)({ email: email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: "USER HAS NOT FOUND " })];
                }
                return [4 /*yield*/, (0, User_Service_1.ForgotPassword)(email)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ result: result })];
        }
    });
}); };
exports.ForgotPasswordHandler = ForgotPasswordHandler;
var CreateAdminHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var admin, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, User_Service_1.CreateUser)(__assign(__assign({}, req.body), { role: Common_1.default.role.ADMIN }))];
            case 1:
                admin = _a.sent();
                return [2 /*return*/, res.send((0, lodash_1.omit)(admin.toJSON(), "password"))];
            case 2:
                e_2 = _a.sent();
                return [2 /*return*/, res.sendStatus(409)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.CreateAdminHandler = CreateAdminHandler;
