
import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthRequest{
  email: string;
  password: string;
}


class AuthUserService{
  async execute({ email, password }: AuthRequest){
    //Verificar se o email existe no banco de dado.
    const user = await prismaClient.user.findFirst({
      where:{
        email: email
      }
    })

    if(!user){
      throw new Error("User/password incorrect")
    }

    // preciso verificar se a senha que ele mandou está correta.
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new Error("User/password incorrect")
    }

    // Se deu tudo certo vamos gerar o token pro usuario.
    const token = sign(
      {
        nameuser: user.nameuser,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )


    return { 
      id: user.id,
      nameuser: user.nameuser,
      email: user.email,
      token: token,
     }
     
  }
}

export { AuthUserService };