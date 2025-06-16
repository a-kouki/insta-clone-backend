import { Request, Response } from "express";
import { UpdatedUserService } from "../../services/user/UpdatedUserService";

class UpdatedUserController{
    async handle(req: Request, res: Response){

        const id = req.user_id;

        const {name, nameuser, description} = req.body;

        const service = new UpdatedUserService();

        const data = await service.execute({id, name, nameuser, description})

        res.json(data)
        return
    }
}

export{UpdatedUserController}