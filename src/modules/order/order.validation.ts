import Joi from "joi";
import { TOrder } from "./order.interface";

export const orderValidationSchema = Joi.object<TOrder>({
  email: Joi.string().email().required(),
  productId: Joi.string().required(),
  price: Joi.number().required().min(0),
  quantity: Joi.number().required().min(1),
  status: Joi.string()
    .valid("pending", "confirmed", "unavailable")
    .default("pending"),
});
