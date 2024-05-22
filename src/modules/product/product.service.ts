import mongoose from "mongoose";
import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createAProduct = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProduct = async (product: TProduct) => {
  const result = await ProductModel.find(product);
  return result;
};

const singleProduct = async (productID: string) => {
  const result = await ProductModel.findById(productID);
  return result;
};

const updateProduct = async (productID: string, product: TProduct) => {
  const result = await ProductModel.findByIdAndUpdate(productID, product);
  return result;
};

const deleteProduct = async (productID: string) => {
  if (!mongoose.Types.ObjectId.isValid(productID)) {
    throw new Error("Invalid product ID");
  }
  try {
    const result = await ProductModel.findByIdAndDelete(productID);
    if (!result) {
      throw new Error("Product not found");
    }
    return result;
  } catch (error: any) {
    throw new Error(`Error deleting product: ${error.message}`);
  }
};

export const productService = {
  createAProduct,
  getAllProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
};
