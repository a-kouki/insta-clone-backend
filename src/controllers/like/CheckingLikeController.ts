import { Request, Response } from "express";
import { CheckingLikeService } from "../../services/like/CheckingLikeService";

export class CheckingLikeController{
    async handle(req:Request, res: Response){
        const { postId } = req.params;
        const user_id = req.user_id;

        if (!postId) {
            res.json(false);
            return;
        }

        const service = new CheckingLikeService();
        const cheingLike = await service.execute(user_id, postId);

        const isLike = !!cheingLike;

        res.json({ isLike });
        return
    }
}