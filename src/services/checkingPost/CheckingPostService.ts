import prismaClient from "../../prisma";

class CheckingPostService{
    async execute(post_id: string){
        const checking = await prismaClient.post.findUnique({
            where: { post_id },
            select: { user_id: true }
        });

        return checking
    }
}

export {CheckingPostService};