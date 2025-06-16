import prismaClient from "../prisma";

export class CheckingFollowService{
    async execute(loggedUserId: string, profileUserId: string){
        const follow = await prismaClient.followRelation.findFirst({
        where:{
            followerId: loggedUserId,
            followingId:profileUserId,
        },
        })

        return follow;
    }
}