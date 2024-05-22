import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

router.post("/", ProductController.createProduct);

router.get("/", ProductController.getAllProduct);

router.get("/:productID", ProductController.singleProduct);

router.put("/:productID", ProductController.updateProduct);

router.delete("/:productID", ProductController.deleteProduct);

export const ProductRoutes = router;
