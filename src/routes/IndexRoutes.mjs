import { Router } from "express";
import userRoutes from "./UserRoutes.mjs";
import postRoutes from "./PostRoutes.mjs";

const indexRoute = Router();

indexRoute.get("/test", (req, res) => {
  res.send("Hello World");
});

indexRoute.use("/auth", userRoutes);
indexRoute.use("/posts", postRoutes);

export default indexRoute;