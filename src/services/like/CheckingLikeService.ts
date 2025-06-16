import prismaClient from "../../prisma";

export class CheckingLikeService{
    async execute(user_id: string, post_id: string){
        const like = await prismaClient.like.findFirst({
        where: {
          user_id: user_id,
          post_id: post_id,
          
        },
    })

        return like;
    }
}