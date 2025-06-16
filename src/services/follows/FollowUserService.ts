// FollowUserService.ts
import prismaClient from "../../prisma";

export class FollowUserService{
    async execute(followerId: string, followingId: string){
        const follow = await prismaClient.followRelation.create({
            data:{
                followerId,
                followingId
            }
        })

        return follow;
    }
}