import cors from "cors";
import express, { type Application } from "express";
import { productRouter, userRouter } from "./components";

const app: Application = express();
// cors para que el cliente pueda hacer peticiones

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

export default app;
