import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface UserRequest {
  name: string
  nameuser: string
  email: string
  password: string
}

class CreateUserService {
  async execute({ name, nameuser, email, password }: UserRequest) {
    if (!email) {
      throw new Error('email: Email is required')
    }

    if (!nameuser) {
      throw new Error('nameuser: Name user is required')
    }

    if (!password) {
      throw new Error('password: Password is required')
    }

    // Verifica se o email já está em uso
    const userByEmail = await prismaClient.user.findUnique({
      where: { email: email }
    })

    if (userByEmail) {
      throw new Error('email: Email is invalid')
    }

    // Verifica se o nome de usuário já está em uso
    const userByNameuser = await prismaClient.user.findUnique({
      where: { nameuser: nameuser }
    })

    if (userByNameuser) {
      throw new Error('nameuser: Name user is invalid ')
    }

    // Criptografa a senha
    const passwordHash = await hash(password, 8)

    // Cria o usuário
    const user = await prismaClient.user.create({
      data: {
        name,
        nameuser,
        email,
        password: passwordHash,
        profile_img: 'https://res.cloudinary.com/dzvxv3uol/image/upload/v1750029744/nopicture_unwsbz.png',
      },
      select: {
        id: true,
        name: true,
        nameuser: true,
        email: true,
        profile_img: true,
        //profile_img_id:true,
      }
    })

    return user
  }
}

export { CreateUserService }
