import { Request, Response } from "express";
import prisma from "../../prisma";
import { UnLikeService } from "../../services/like/UnLikeService";

export class UnLikeController {
  async handle(req: Request, res: Response) {
    const { post_id, user_id } = req.body;

    const service = new UnLikeService();

    const like = await service.execute({
        post_id,
        user_id,
      });
    
      res.json({sucess: true});     
      return 
  }
}

