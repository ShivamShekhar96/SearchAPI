import { Router } from "express";
import userRoutes from "./user.routes";
import healthCheckRoutes from "./healthCheck.routes";
import serchRoutes from "./search.routes";

const api = Router()
  .use(userRoutes)
  .use(healthCheckRoutes)
  .use(serchRoutes);

export default Router().use("/api/v1/", api);
