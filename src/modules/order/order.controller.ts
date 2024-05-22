import { Request, Response } from "express";
import { OrderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;
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
        success: true,
        message: "Stock Unavailable",
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
  const queryEmail = req.query.email as string;
  const result = await OrderService.getOrders(queryEmail);
  res.json({
    success: true,
    message: "Orders fetched successfully",
    data: result,
  });
};

export const OrderController = {
  createOrder,
  getOrders,
};
