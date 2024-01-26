import { createSearches, getUserSearches } from "controllers/search.controller";
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
            const payload = {
                url: req.body.url as string,
                description: req.body.description as string,
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