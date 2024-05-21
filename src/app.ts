import express, { Request, Response } from "express";

const app = express();

//parsers
app.use(express.json());

// app.use("/api/products", ProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next!");
});

export default app;