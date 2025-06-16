// UnfollowUserService.ts
import prismaClient from "../../prisma";

export class UnfollowUserService {
  async execute(followerId: string, followingId: string) {
    const result = await prismaClient.followRelation.deleteMany({
      where: {
        followerId,
        followingId,
      },
    });
    
    return result;
  }
}