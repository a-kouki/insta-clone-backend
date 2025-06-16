import prismaClient from "../../prisma";

interface UserRequest {
  post_id: string;
  user_id: string;
}

class UnLikeService{
  async execute({ post_id, user_id }: UserRequest) {
   
      const like = await prismaClient.like.deleteMany({
        where: {
          post_id: post_id,
          user_id: user_id,
        },
      });
    }
}

export { UnLikeService };
