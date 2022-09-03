"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Category_Controller_1 = require("../controllers/Category.Controller");
var Authentication_1 = require("../middleware/Authentication");
var ValidateRequest_1 = __importDefault(require("../middleware/ValidateRequest"));
var Category_Schema_1 = require("../schema/Category.Schema");
var CategoryRoute = function (app) {
    app.get("/category/:id", Authentication_1.VerifyLogin, Category_Controller_1.GetCategoryHandler);
    app.get("/categories", Category_Controller_1.GetListCategoryHandler);
    app.post("/categories/sort", (0, ValidateRequest_1.default)(Category_Schema_1.GetListCategorySortedSchema), Category_Controller_1.GetListCategorySortedByNameHandler);
    app.post("/category", Authentication_1.VerifyLogin, Authentication_1.RequireStaff, (0, ValidateRequest_1.default)(Category_Schema_1.CreateCategorySchema), Category_Controller_1.CreateCategoryHandler);
    app.put("/category/:id", Authentication_1.VerifyLogin, Authentication_1.RequireStaff, (0, ValidateRequest_1.default)(Category_Schema_1.CreateCategorySchema), Category_Controller_1.UpdateCategoryHandler);
    app.delete("/category/:id", Authentication_1.VerifyLogin, Authentication_1.RequireStaff, Category_Controller_1.DeleteCategoryByIDHandler);
};
exports.default = CategoryRoute;
