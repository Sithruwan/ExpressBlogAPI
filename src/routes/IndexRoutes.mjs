import { Router } from "express";
import userRoutes from "./UserRoutes.mjs";

const indexRoute = Router();

indexRoute.get("/test", (req, res) => {
  res.send("Hello World");
});

indexRoute.use("/auth", userRoutes);

export default indexRoute;