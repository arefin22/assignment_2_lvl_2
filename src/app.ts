import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/product/product.route";
import { orderRoutes } from "./modules/order/order.route";

const app = express();

//parsers
app.use(express.json());

// Routes
app.use("/api/products", ProductRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Duniya!");
});

export default app;
