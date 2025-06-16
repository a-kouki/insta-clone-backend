import { Request, Response } from "express";
import { DeleteProfileImageService } from "../../services/alter_profile_img/DeleteProfileImageService";


class DeleteProfileImageController{
    async handle(req: Request, res:Response){
        const userId = req.user_id;
        const service = new DeleteProfileImageService();
        const user = await service.execute(userId);
        
        res.json(user)
        return 
    }
}

export{DeleteProfileImageController}