import prismaClient from "../../prisma";

class DetailUserService{
  async execute(user_id: string){

    const user = await prismaClient.user.findFirst({
      where:{
        id: user_id
      },
      select:{
        id: true,
        name: true,
        nameuser: true,
        email: true,
        description:true,
        followers:true,
        followings:true,
        profile_img:true,
        profile_img_id: true,
        posts_user:true,
      }
    })

    return user;
  }
}

export { DetailUserService }