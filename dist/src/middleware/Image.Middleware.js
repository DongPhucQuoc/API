"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var ImageMiddleware = (0, multer_1.default)({
    limits: {
        fileSize: 4 * 1024 * 1024,
    },
});
exports.default = ImageMiddleware;
