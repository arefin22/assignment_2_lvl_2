import { Request, Response } from "express";
import { productService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  const result = await productService.createAProduct(productData);

  res.json({
    success: true,
    message: "Product created successfully !",
    data: result,
  });
};

const getAllProduct = async (req: Request, res: Response) => {
  const result = await productService.getAllProduct(req.body);
  res.json({
    success: true,
    message: "Products fetched successfully!",
    data: result,
  });
};

const singleProduct = async (req: Request, res: Response) => {
  const result = await productService.singleProduct(req.params.productID);
  res.json({
    success: true,
    message: "Product fetched successfully!",
    data: result,
  });
};

const updateProduct = async (req: Request, res: Response) => {
  const result = await productService.updateProduct(
    req.params.productID,
    req.body
  );
  res.json({
    success: true,
    message: "Product updated successfully!",
    data: result,
  });
};

const deleteProduct = async (req: Request, res: Response) => {
  const result = await productService.deleteProduct(req.params.productID);
  res.json({
    success: true,
    message: "Product deleted successfully!",
    data: result,
  });
};

export const ProductController = {
  createProduct,
  getAllProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
};
