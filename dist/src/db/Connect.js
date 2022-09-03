"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Default_1 = __importDefault(require("../../config/Default"));
var ConnectDB = function () {
    return mongoose_1.default
        .connect(Default_1.default.dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
        .then(function () {
        console.log("Connected to database");
    })
        .catch(function (error) {
        console.log("Connection has failed: ", error);
        process.exit(1);
    });
};
exports.default = ConnectDB;
