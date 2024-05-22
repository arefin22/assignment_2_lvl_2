import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { orderValidationSchema } from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;

  const { error } = orderValidationSchema.validate(orderData);

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
    const result = await OrderService.createOrder(orderData);
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
  } catch (err: any) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const queryEmail = req.query.email as string;
    const result = await OrderService.getOrders(queryEmail);
    res.json({
      success: true,
      message: "Orders fetched successfully",
      data: result,
    });
  } catch (err: any) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export const OrderController = {
  createOrder,
  getOrders,
};
