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
const product_validation_1 = require("./product.validation");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body;
    const { error } = product_validation_1.productValidationSchema.validate(productData);
    const result = yield product_service_1.productService.createAProduct(productData);
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
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.productService.getAllProduct(searchTerm);
        res.json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
    catch (_a) {
        res.status(500).json({
            success: false,
            message: "Products Not Available",
        });
    }
});
const singleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.productService.singleProduct(req.params.productID);
        res.json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (_b) {
        res.status(500).json({
            success: false,
            message: "Product Not Found",
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.productService.updateProduct(req.params.productID, req.body);
        res.json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (_c) {
        res.status(500).json({
            success: false,
            message: "Product Not Found",
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.productService.deleteProduct(req.params.productID);
        res.json({
            success: true,
            message: "Product deleted successfully!",
            data: result,
        });
    }
    catch (_d) {
        res.status(500).json({
            success: false,
            message: "Product Not Found",
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProduct,
    singleProduct,
    updateProduct,
    deleteProduct,
};
