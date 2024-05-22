import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";
import { ProductModel } from "../product/product.model";

const OrderSchema = new Schema<TOrder>({
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
OrderSchema.pre("save", async function (next) {
  try {
    const order = this as TOrder;
    const product = await ProductModel.findById(order.productId);

    // if stock is not available or product is not available
    if (
      !product ||
      !product.inventory ||
      !product.inventory.quantity ||
      !product.inventory.inStock ||
      product.inventory.quantity < order.quantity
    ) {
      order.status = "Unavailable";
    }
    // if Product is available
    else {
      product.inventory.quantity -= order.quantity;
      if (product.inventory.quantity === 0) {
        product.inventory.inStock = false;
      }
      await product.save();

      order.status = "confirm";
    }

    next();
  } catch (err: any) {
    next(err);
  }
});

// Reducing the product Quantity

export const OrderModel = model<TOrder>("Order", OrderSchema);
