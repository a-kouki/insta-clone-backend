// UnfollowUserController.ts
import { Request, Response } from "express";
import { UnfollowUserService } from "../../services/follows/UnfollowUserService";

export class UnfollowUserController {
  async handle(req: Request, res: Response) {
    const followerId = req.user_id;
    const { followingId } = req.body;

    const service = new UnfollowUserService();
    
    await service.execute(followerId, followingId);

    res.json({ success: true });
    return 
  }
}
