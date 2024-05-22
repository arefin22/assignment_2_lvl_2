import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/product/product.route";

const app = express();

//parsers
app.use(express.json());


// Routes
app.use("/api/products", ProductRoutes);



app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next!");
});

export default app;