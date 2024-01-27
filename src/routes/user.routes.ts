import {
  createUser,
  getUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller";
import { Request, Router, Response, NextFunction } from "express";

const router = Router();
// TODO: add strong parameters
router.get(
  "/users/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = {
        email: req.body.email,
      };
      const data = await getUser(payload);
      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/users/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
      };
      const profile = await createUser(payload);
      res.json({ profile });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/users/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth_key = req.headers["x-auth-key"] as string;
      const payload = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        auth_key,
      };
      const profile = await loginUser(payload);
      res.json({ profile });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/users/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth_key = req.headers["x-auth-key"] as string;
      await logoutUser(auth_key);
      res.json("Success");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
