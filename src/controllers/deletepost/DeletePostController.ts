import { Request, Response } from "express";
import { DeletePostService } from "../../services/deletepost/DeletePostSercvice";

interface AuthenticatedRequest extends Request {
  user_id?: string;
}

export class DeletePostController {
  async handle(req: Request, res: Response) {
    const authedReq = req as AuthenticatedRequest;
    const post_id = req.query.post_id as string;

    if (!post_id) {
      res.status(400).json({ error: "post_id é obrigatório" });
      return;
    }

    try {
      const service = new DeletePostService();
      const deletepost = await service.execute(post_id);

      res.json({ success: true, message: "Post deletado com sucesso." });
      return
    } catch (err) {
      console.error(err);
      
      res.status(500).json({ error: "Erro interno do servidor" });
      return
    }
  }
}
