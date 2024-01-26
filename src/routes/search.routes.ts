import { createSearches, getUserSearches } from "../controllers/search.controller";
import { Request, Router, Response, NextFunction } from "express";

const router = Router();

router.get(
    "/searches/",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const auth_key = req.headers['X-Auth-Key'] as string
            const data = await getUserSearches({ auth_key });
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
            const auth_key = req.headers['X-Auth-Key'] as string
            const urlParts = req.body.url.split('?')
            const payload = {
                url: urlParts[0],
                description: req.body.description,
                user_id: parseInt(req.body.user_id),
                auth_key
            };
            const data = await createSearches(payload);
            res.json({ data });
        } catch (error) {
            next(error);
        }
    }
);

export default router