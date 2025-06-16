import { Request, Response } from "express";
import { CheckingFollowService } from "../services/CheckingFollowService";

export class CheckingFollowController {
  async handle(req: Request, res: Response) {
    const loggedUserId = req.user_id; 
    const {profileUserId} = req.params;
    if(!profileUserId) {
        res.json(false);
        return 
    }
    const service = new CheckingFollowService();
    const checkingFollow = await service.execute(loggedUserId, profileUserId);

    const isFollowing = !!checkingFollow; // transforma em booleano

    res.json({ isFollowing }); 
    return
}
}
