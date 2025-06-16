import prismaClient from "../../prisma";

class LikeService {
  async execute(user_id: string, post_id:string ) {
    try {
      const like = await prismaClient.like.create({
        data: {
          user_id,
          post_id,
        },
      });
      return like;
    } catch (error) {
      console.error("Erro ao curtir post:", error);
      throw new Error("Não foi possível curtir o post");
    }
  }
}

export { LikeService };
