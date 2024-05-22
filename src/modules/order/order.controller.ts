import { Request, Response } from "express";
import { OrderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;
  const result = await OrderService.createOrder(orderData);

  res.json({
    success: true,
    message: "Order created successfully",
    data: result,
  });
};

export const OrderController = {
  createOrder,
};
