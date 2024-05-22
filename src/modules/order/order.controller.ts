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

const getOrders = async (req: Request, res: Response) => {
    const queryEmail = req.query.email as string
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
