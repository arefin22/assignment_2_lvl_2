import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createAProduct = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

// getAllProduct
const getAllProduct = async (searchTerm: string) => {
  if (searchTerm) {
    const result = await ProductModel.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
        { tags: { $regex: searchTerm, $options: "i" } },
      ],
    });
    return result;
  } else {
    const result = await ProductModel.find();
    return result;
  }
};
// search a Product
// const searchProduct = async (searchTerm: string) => {
//   if (searchTerm) {
//     const result = await ProductModel.find({
//       $or: [
//         { name: { $regex: searchTerm, $options: "i" } },
//         { description: { $regex: searchTerm, $options: "i" } },
//         { category: { $regex: searchTerm, $options: "i" } },
//         { tags: { $regex: searchTerm, $options: "i" } },
//       ],
//     });
//     return result;
//   } else {
//     const result = await ProductModel.find();
//     return result;
//   }
// };

const singleProduct = async (productID: string) => {
  const result = await ProductModel.findById(productID);
  return result;
};

const updateProduct = async (productID: string, product: TProduct) => {
  const result = await ProductModel.findByIdAndUpdate(productID, product);
  return result;
};

const deleteProduct = async (productID: string) => {
  const result = await ProductModel.findByIdAndDelete(productID);
  if (!result) {
    throw new Error("Product not found");
  }
  return result;
};

export const productService = {
  createAProduct,
  getAllProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
  //   searchProduct,
};
