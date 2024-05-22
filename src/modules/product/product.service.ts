import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createAProduct = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProduct = async (product: TProduct) => {
    const result = await ProductModel.find(product);
    return result;
}

const singleProduct = async (productID: string) => {
    const result = await ProductModel.findById(productID);
    return result;
}

export const productService = {
  createAProduct,
  getAllProduct,
  singleProduct,
};
