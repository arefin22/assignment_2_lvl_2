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
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = require("../product/product.model");
const OrderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: { type: String, default: "pending" },
});
// Checking If product Is available Or not
OrderSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = this;
            const product = yield product_model_1.ProductModel.findById(order.productId);
            // if stock is not available or product is not available
            if (!product ||
                !product.inventory ||
                !product.inventory.quantity ||
                !product.inventory.inStock ||
                product.inventory.quantity < order.quantity) {
                order.status = "Unavailable";
            }
            // if Product is available
            else {
                product.inventory.quantity -= order.quantity;
                if (product.inventory.quantity === 0) {
                    product.inventory.inStock = false;
                }
                yield product.save();
                order.status = "confirm";
            }
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
// Reducing the product Quantity
exports.OrderModel = (0, mongoose_1.model)("Order", OrderSchema);
