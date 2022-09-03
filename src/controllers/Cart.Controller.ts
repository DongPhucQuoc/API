import { Request, Response } from "express";
import { GetPriceBySize } from "../services/Cart.Service";
import { FindProduct } from "../services/Product.Service";
import { SupportGetProductByID } from "./Product.Controller";
import { get } from "lodash";

export interface CartSessionDocument {
  product: string;
  quantity: number;
  size: string;
}

export const CreateCartHandler = async (req: Request, res: Response) => {
  const productID = req.body.product;
  const isProductExist = await FindProduct({ _id: productID });
  if (!isProductExist) {
    return res.status(404).json({ message: "PRODUCT HAS NOT FOUND" });
  }

  const cart: CartSessionDocument = req.body;
  const session = req.session as any

  console.log("session", session.carts)
  if (!session.carts) {
    session.carts = [cart];
  } else {
    let flag = false;
    for (let i = 0; i < session.carts.length; i++) {
      if (
        session.carts[i].product === cart.product &&
        session.carts[i].size === cart.size
      ) {
        flag = true;
        session.carts[i].quantity += cart.quantity;
        break;
      }
    }

    if (!flag) {
      session.carts.push(cart);
    }
  }

  const product = await SupportGetProductByID(req, res, cart.product) as any;

  const result = { ...cart, product: product } as any;

  return res.status(200).json({ result });
};

const SupportGetCartInfo = (req: Request, idProduct: string) => {
  const session = req.session as any
  const carts = session.carts || req.body?.carts;
  for (let i = 0; i < carts?.length; i++) {
    if (carts[i].product === idProduct) {
      return carts[i];
    }
  }
};

export const GetAllCartHandler = async (req: Request, res: Response) => {
  const session = req.session as any
  if (!session.carts) {
    return res.status(200).json({ status: "error", session: "SESSION EMPTY" });
  }

  let result: any = [];

  const carts = session.carts;
  for (let i = 0; i < carts.length; i++) {
    const product = await SupportGetProductByID(req, res, carts[i].product);
    const cart = {
      product: product,
      quantity: carts[i].quantity,
      size: carts[i].size,
    };
    result.push(cart);
  }

  return res.status(200).json({ result });
};

export const GetCartPriceSelectedHandler = async (
  req: Request,
  res: Response
) => {
  const session = req.session as any

  const list = req.body.carts;
  if (list.length === 0) {
    return res.status(200).json({ result: 0 });
  }

  let result: number = 0;
  for (let i = 0; i < list.length; i++) {
    const product = await FindProduct({ _id: list[i] });
    if (!product) {
      return res.status(400).json({ message: "PRODUCT HAS NOT FOUND" });
    }
    const cart = SupportGetCartInfo(req, list[i]);
    
    result += (product.price + GetPriceBySize(cart?.size || 'S')) * (cart?.quantity || 1);
  }

  return res.status(200).json({ result });
};

export const GetCartQuantityHandler = (req: Request, res: Response) => {
  try {
    const session = req.session as any

    const result = get(session, "carts").length || 0;

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json({ error })
  }
}

export const UpdateCartByIDHander = async (req: Request, res: Response) => {
  const session = req.session as any

  const idProduct = req.body.product;
  if (!idProduct) {
    return res.status(400).json({ message: "ID PRODUCT IS REQUIRED" });
  }

  const product = await FindProduct({ _id: idProduct });
  if (!product) {
    return res.status(404).json({ message: "PRODUCT HAS NOT FOUND" });
  }

  let result: CartSessionDocument = {
    product: "",
    quantity: 0,
    size: "",
  };

  for (let i = 0; i < session.carts.length; i++) {
    if (session.carts[i].product === idProduct) {
      session.carts[i].quantity = req.body.quantity;
      session.carts[i].size = req.body.size;
      result = {
        product: product,
        quantity: session.carts[i].quantity,
        size: session.carts[i].size,
      };
      break;
    }
  }
  return res.status(200).json({ result });
};

export const DeleteCartByIDHandler = async (req: Request, res: Response) => {
  const idProduct = get(req, "params.id");
  if (!idProduct) {
    return res.status(400).json({ message: "ID PRODUCT IS REQUIRED" });
  }

  SupportDeleteCartByIDProduct(req, idProduct);

  return res.status(200).json({ message: "DELETE SUCCESSFUL" });
};

export const DeleteListCartByIDHandler = async (
  req: Request,
  res: Response
) => {
  const list = req.body.carts;
  for (let i = 0; i < list.length; i++) {
    SupportDeleteCartByIDProduct(req, list[i]);
  }

  return res.status(200).json({ message: "DELETE SUCCESSFUL" });
};

export const DeleteAllCartHandler = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    return res.status(200).json({ message: "DELETE SUCCESSFUL" });
  });
};

const SupportDeleteCartByIDProduct = (req: Request, id: string) => {
  const session = req.session as any

  session.carts = session.carts.filter((cart: CartSessionDocument) => {
    return cart.product !== id;
  });
};
