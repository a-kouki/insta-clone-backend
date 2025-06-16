import { Request, Response } from "express";
import { CreateCommentService } from "../../services/comment/CommentService";

class CreateCommentController {
  async handle(req: Request, res: Response) {
    const { postId, text } = req.body;
    const userId = req.user_id; 

    const service = new CreateCommentService();

    try {
      const comment = await service.execute({ userId, postId, text});
      res.json(comment);
      return 
    } catch (err: any) {
      res.status(400).json({ error: err.message });
      return 
    }
  }
}

export { CreateCommentController };
