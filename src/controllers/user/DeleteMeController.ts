import { Request, Response } from "express";
import { DeleteMeService } from "../../services/user/DeleteMeService";

export class DeleteMeController {
  async handle(req: Request, res: Response) {
    const userId = req.user_id;

    const service = new DeleteMeService();
    await service.execute(userId);
    
    res.status(200).json({ message: "User delete with sucess." });
     
  }
}
