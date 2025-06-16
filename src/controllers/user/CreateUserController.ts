import {Request, response, Response} from 'express'
import { CreateUserService } from '../../services/user/CreateUserService'

class CreateUserController{
  async handle(req: Request, res: Response){
    try {
    const { name, nameuser, email, password } = req.body

    const service = new CreateUserService()
    const user = await service.execute({ name, nameuser, email, password })
    
    res.json(user)
    return 
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
      return
    }
    res.status(500).json({ message: 'Erro inesperado' })
    return 
  }
  }
}

export { CreateUserController }