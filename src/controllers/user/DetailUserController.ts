import {Request, Response} from 'express'
import { DetailUserService } from '../../services/user/DetailUserService'

class DetailuserController{
  async handle(req: Request, res: Response){

    const user_id = req.user_id;

    const detailUserService = new DetailUserService();

    const user = await detailUserService.execute(user_id);
    
    res.json(user)
    return 

  }
}

export { DetailuserController  }