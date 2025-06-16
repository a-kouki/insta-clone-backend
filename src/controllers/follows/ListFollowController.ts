// controllers/followController.ts
import { Request, Response } from 'express';
import { ListFollowService } from '../../services/follows/ListFollowService';


class ListFollowController{
    async handle(req: Request, res: Response){
        const { type } = req.params;
        const { userId } = req.query;

        const service = new ListFollowService();

        try {
            const result = await service.execute(userId as string, type);
            res.json(result);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
} 

export {ListFollowController}

