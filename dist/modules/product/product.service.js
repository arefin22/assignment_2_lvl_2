"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const product_model_1 = require("./product.model");
const createAProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(product);
    return result;
});
// getAllProduct
const getAllProduct = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    if (searchTerm) {
        const result = yield product_model_1.ProductModel.find({
            $or: [
                { name: { $regex: searchTerm, $options: "i" } },
                { description: { $regex: searchTerm, $options: "i" } },
                { category: { $regex: searchTerm, $options: "i" } },
                { tags: { $regex: searchTerm, $options: "i" } },
            ],
        });
        return result;
    }
    else {
        const result = yield product_model_1.ProductModel.find();
        return result;
    }
});
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
const singleProduct = (productID) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findById(productID);
    return result;
});
const updateProduct = (productID, product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findByIdAndUpdate(productID, product);
    return result;
});
const deleteProduct = (productID) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findByIdAndDelete(productID);
    if (!result) {
        throw new Error("Product not found");
    }
    return result;
});
exports.productService = {
    createAProduct,
    getAllProduct,
    singleProduct,
    updateProduct,
    deleteProduct,
    //   searchProduct,
};
