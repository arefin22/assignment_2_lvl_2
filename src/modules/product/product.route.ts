import express from "express";
import { ProductController } from "./product.controller";


const router = express.Router();

router.post("/", ProductController.createProduct);

router.get("/", ProductController.getAllProduct);

router.get("/:productID", ProductController.singleProduct)

export const ProductRoutes = router;