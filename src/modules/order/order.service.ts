import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrder = async (order: TOrder) => {
  const result = OrderModel.create(order);
  return result;
};

const getOrders = async (email: string) => {
  if (email) {
    const result = OrderModel.find({ email: email });
    return result;
  }
  const result = OrderModel.find();
  return result;
};

export const OrderService = {
  createOrder,
  getOrders,
};
