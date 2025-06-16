import { Request, Response } from "express";
import { MeDataService } from "../services/MeService";

class MeDataController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const detailUserService = new MeDataService();

    const user = await detailUserService.execute(user_id);
    
    res.json(user)
    return  
  }
}

export { MeDataController };

