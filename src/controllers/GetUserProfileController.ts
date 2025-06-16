// controllers/user/GetUserProfileController.ts
import { Request, Response } from 'express';
import { GetUserProfileService } from '../services/GetUserProfileService';

export class GetUserProfileController {
  async handle(req: Request, res: Response) {
    const { username } = req.params;

    const service = new GetUserProfileService();
    try {
      const user = await service.execute(username);
      res.json(user);
      return 
    } catch (err: any) {
      res.status(404).json({ error: err.message });
      return 
    }
  }
}
