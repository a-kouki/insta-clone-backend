//FollowUserController.ts
import { Request, Response } from "express";
import { FollowUserService } from "../../services/follows/FollowUserService";

export class FollowUserController{
    async handle(req:Request, res:Response){
        const followerId = req.user_id;
        const {followingId} = req.body;
        
        const service = new FollowUserService();
        const result = await service.execute(followerId, followingId);

        res.json({success: true})
        return;
    }
} 