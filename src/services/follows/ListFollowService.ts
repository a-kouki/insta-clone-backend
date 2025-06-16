import prismaClient from "../../prisma";

class ListFollowService{
    async execute(userId: string, type: string){
        if (type === 'followings') {
            const followings = await prismaClient.followRelation.findMany({
            where: { followerId: userId },
            include: {
                following: {
                select: {
                    id: true,
                    nameuser: true,
                    name:true,
                    profile_img: true,
                    profile_img_id:true,
                },
                },
            },
            });
            return followings.map(f => f.following);
        }

        if (type === 'followers') {
            const followers = await prismaClient.followRelation.findMany({
            where: { followingId: userId },
            include: {
                follower: {
                select: {
                    id: true,
                    nameuser: true,
                    name:true,
                    profile_img: true,
                    profile_img_id:true,
                },
                },
            },
            });
            return followers.map(f => f.follower);
        }
    }
}

export{ListFollowService}