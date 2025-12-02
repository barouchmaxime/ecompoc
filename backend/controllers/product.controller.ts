import { Request, Response } from "express";
import { products } from "../mocks/product.mock.js";
export const getProducts = async (req: Request, res: Response) => {
  try {
    res.status(200).json(
      products
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to load products"
    });
  }
};
