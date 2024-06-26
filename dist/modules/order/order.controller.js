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
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = require("./order.validation");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = req.body;
    const { error } = order_validation_1.orderValidationSchema.validate(orderData);
    if (error) {
        return res.status(500).json({
            success: false,
            message: error.details[0].message,
        });
    }
    if (!orderData.productId || !orderData.quantity) {
        res.json({
            success: false,
            message: "Product ID & Quantity Needed",
        });
    }
    try {
        const result = yield order_service_1.OrderService.createOrder(orderData);
        if (result.status === "Unavailable") {
            // console.log("unavailable");
            return res.json({
                success: false,
                message: "Insufficient quantity available in inventory",
            });
        }
        return res.json({
            success: true,
            message: "Order created successfully",
            data: result,
        });
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message,
        });
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryEmail = req.query.email;
        const result = yield order_service_1.OrderService.getOrders(queryEmail);
        if (result.length === 0) {
            return res.json({
                success: false,
                message: "No valid Email is available",
            });
        }
        else {
            res.json({
                success: true,
                message: "Orders fetched successfully",
                data: result,
            });
        }
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message,
        });
    }
});
exports.OrderController = {
    createOrder,
    getOrders,
};
