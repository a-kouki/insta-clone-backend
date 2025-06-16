import prismaClient from "../../prisma";
class SearchService{
    async execute(query:string){
        
        const users = await prismaClient.user.findMany({
        where: {
            OR: [
            { nameuser: { contains: query } },
            { name: { contains: query } },
            ],
        },
        select: {
            id: true,
            nameuser: true,
            name: true,
            profile_img: true,
        },
        //take: 10, // Limita para 10 resultados
        });

        return users
     
        }
}

export {SearchService}