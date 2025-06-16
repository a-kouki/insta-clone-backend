import { Request, Response } from "express";
import { CheckingPostService } from "../../services/checkingPost/CheckingPostService";

interface AuthenticatedRequest extends Request {
  user_id?: string;
}

export class CheckPostOwnerController {
  async handle(req: Request, res: Response) {
    const authedReq = req as AuthenticatedRequest; 

    const post_id = req.query.post_id as string;

    if (!post_id) {
        res.status(400).json({ error: "post_id é obrigatório" });
        return
    }

    try {
      const service = new CheckingPostService();
      const post = await service.execute(post_id);
      if (!post) {
        res.status(404).json({ error: "Post não encontrado" });
        return
      }

      const isOwner = post.user_id === authedReq.user_id;  
      
      res.json({ isOwner });
      return 
    } catch (err) {
        res.status(500).json({ error: "Erro interno do servidor" });
        return
    }
  }
}
