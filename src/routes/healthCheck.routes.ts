import { Request, Router, Response, NextFunction } from "express";

const router = Router();

router.get(
  "/health/ping",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json("App running");
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/health/env",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({
        db_host: process.env.DB_HOST,
        db_user: process.env.DB_USER,
        db_url: process.env.DB_URL,
        db_name: process.env.DB_NAME,
      });
    } catch (error) {
      next(error);
    }
  }
);
export default router;
