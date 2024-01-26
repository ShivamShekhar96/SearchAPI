import { createSearches, getUserSearches } from "../controllers/search.controller";
import { Request, Router, Response, NextFunction } from "express";

const router = Router();

router.get(
    "/searches/",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await getUserSearches({
                user_id: parseInt(req.body.user_id),
            });
            res.status(200).json({ data });
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    "/searches/",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const urlParts = req.body.url.split('?')
            const payload = {
                url: urlParts[0],
                description: req.body.description,
                user_id: parseInt(req.body.user_id),
            };
            const data = await createSearches(payload);
            res.json({ data });
        } catch (error) {
            next(error);
        }
    }
);

export default router