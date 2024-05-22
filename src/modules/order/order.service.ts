import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrder = async (order: TOrder) => {
  const result = OrderModel.create(order);
  return result;
};

export const OrderService = {
  createOrder,
};
