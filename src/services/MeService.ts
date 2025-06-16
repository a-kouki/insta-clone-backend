import prismaClient from "../prisma";

class MeDataService {
  async execute(user_id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id
      },
      select: {
        id: true,
        nameuser: true,
        email: true,
        description:true,

      }
    })
 
    return user;
  }
}

export { MeDataService };
