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
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body;
    const result = yield product_service_1.productService.createAProduct(productData);
    res.json({
        success: true,
        message: "Product created successfully !",
        data: result,
    });
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.query.searchTerm;
    const result = yield product_service_1.productService.getAllProduct(searchTerm);
    res.json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
    });
});
const singleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.singleProduct(req.params.productID);
    res.json({
        success: true,
        message: "Product fetched successfully!",
        data: result,
    });
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.updateProduct(req.params.productID, req.body);
    res.json({
        success: true,
        message: "Product updated successfully!",
        data: result,
    });
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.deleteProduct(req.params.productID);
    res.json({
        success: true,
        message: "Product deleted successfully!",
        data: result,
    });
});
exports.ProductController = {
    createProduct,
    getAllProduct,
    singleProduct,
    updateProduct,
    deleteProduct,
};
