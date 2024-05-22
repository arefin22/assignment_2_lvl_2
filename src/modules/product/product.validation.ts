import Joi from "joi";
import { TInventory, TProduct, TVariant } from "./product.interface";

export const variantSchema = Joi.object<TVariant>({
  type: Joi.string().required(),
  value: Joi.string().required(),
});
export const inventorySchema = Joi.object<TInventory>({
  quantity: Joi.number().required().min(0),
  inStock: Joi.boolean().required(),
});

export const productValidationSchema = Joi.object<TProduct>({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required().min(0),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  variants: Joi.array().items(variantSchema).required(),
  inventory: inventorySchema.required(),
});
