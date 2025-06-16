import { Request, Response } from "express";
import prisma from "../../prisma";
import { LikeService } from "../../services/like/LikeService";

export class LikeController {
  async handle(req: Request, res: Response) {
    const id = req.user_id;
    const { post_id } = req.body;

    const service = new LikeService();

    try {
      const like = await service.execute(
        id,
        post_id,
      );
    
      res.status(201).json(like);
      return 
    } catch (error) {
      console.error("Erro ao curtir:", error);
      
      res.status(500).json({ error: "Erro interno do servidor" });
      return 
    }
  }
}

