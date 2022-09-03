import { Express } from "express";
import {
  CreateProductHandler,
  DeleteProductByIDHandler,
  GetListProductHandler,
  GetProductByIDHandler,
  UpdateProductHandler,
  GetLengthOfProductHandler,
  GetLengthOfProductWithCategoryHandler,
  GetListProductsSortedByNameHandler,
  GetListProductsByCategoryHandler,
  GetListProductSortByPriceHandler,
  GetListProductForOrderHandler,
  GetListProductWithPageHandler,
  GetListProductByCategorySortedByNameHandler,
  GetListProductByCategorySortedByPriceHandler,
  GetListProductSortedByNameAndPriceHandler,
  GetListProductByCategorySortedByNameAndPriceHandler,
  GetListProductsSortedByNameWithPageHandler,
  GetListProductSortByPriceWithPageHandler,
} from "../controllers/Product.Controller";
import { VerifyLogin, RequireStaff } from "../middleware/Authentication";
import ValidateRequest from "../middleware/ValidateRequest";
import {
  CreateProductSchema,
  GetListProductByCategorySortedByNameAndPriceSchema,
  GetListProductForOrder,
  GetListProductSortedSchema,
  GetListProductSortedByNameAndPriceSchema,
} from "../schema/Product.Schema";

const ProductRoute = (app: Express) => {
  app.get("/product/:id", GetProductByIDHandler);
  app.get("/products", GetListProductHandler);
  app.get("/products/length", GetLengthOfProductHandler);
  app.get("/products/length/:category", GetLengthOfProductWithCategoryHandler);
  app.get("/products/:category", GetListProductsByCategoryHandler);
  app.get("/products/search/:page", GetListProductWithPageHandler);

  app.post(
    "/product",
    VerifyLogin,
    RequireStaff,
    ValidateRequest(CreateProductSchema),
    CreateProductHandler
  );
  app.post(
    "/products/order",
    VerifyLogin,
    ValidateRequest(GetListProductForOrder),
    GetListProductForOrderHandler
  );
  app.post(
    "/products/sort/name",
    ValidateRequest(GetListProductSortedSchema),
    GetListProductsSortedByNameHandler
  );
  app.post(
    "/products/sort/name/:page",
    ValidateRequest(GetListProductSortedSchema),
    GetListProductsSortedByNameWithPageHandler
  );
  app.post(
    "/products/sort/price",
    ValidateRequest(GetListProductSortedSchema),
    GetListProductSortByPriceHandler
  );
  app.post(
    "/products/sort/price/:page",
    ValidateRequest(GetListProductSortedSchema),
    GetListProductSortByPriceWithPageHandler
  );
  app.post(
    "/products/sort/name/category/:idCategory",
    ValidateRequest(GetListProductSortedSchema),
    GetListProductByCategorySortedByNameHandler
  );
  app.post(
    "/products/sort/price/category/:idCategory",
    ValidateRequest(GetListProductSortedSchema),
    GetListProductByCategorySortedByPriceHandler
  );
  app.post(
    "/products/sort",
    ValidateRequest(GetListProductSortedByNameAndPriceSchema),
    GetListProductSortedByNameAndPriceHandler
  );
  app.post(
    "/products/sort/:idCategory",
    ValidateRequest(GetListProductByCategorySortedByNameAndPriceSchema),
    GetListProductByCategorySortedByNameAndPriceHandler
  );

  app.put(
    "/product/:id",
    VerifyLogin,
    RequireStaff,
    ValidateRequest(CreateProductSchema),
    UpdateProductHandler
  );

  app.delete(
    "/product/:id",
    VerifyLogin,
    RequireStaff,
    DeleteProductByIDHandler
  );
};

export default ProductRoute;
