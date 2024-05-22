import { Request, Response } from "express";
import { productService } from "./product.service";
import { productValidationSchema } from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  const { error } = productValidationSchema.validate(productData);
  const result = await productService.createAProduct(productData);

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.details[0].message,
    });
  }

  res.status(200).json({
    success: true,
    message: "Product created successfully !",
    data: result,
  });
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = await productService.getAllProduct(searchTerm);
    res.json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Products Not Available",
    });
  }
};

const singleProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.singleProduct(req.params.productID);
    res.json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Product Not Found",
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.updateProduct(
      req.params.productID,
      req.body
    );
    res.json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Product Not Found",
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.deleteProduct(req.params.productID);
    res.json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Product Not Found",
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
};
