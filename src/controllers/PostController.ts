import { Request, Response } from 'express';
import { GetAllPostsService } from '../services/PostService';

class GetAllPostsController{
  async handle(req: Request, res: Response){
    const service = new GetAllPostsService();
    const post = await service.execute();

    res.json({post})
    return
  }
}

export {GetAllPostsController}