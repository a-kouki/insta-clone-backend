import prismaClient from "../../prisma";

interface DataAlter{
    id: string;
    name: string; 
    nameuser: string;
    description: string;
}

class UpdatedUserService{
    async execute({id, name, nameuser, description}: DataAlter){
        
        const data = await prismaClient.user.update({
            where:{id:id},
            data:{
                name: name,
                nameuser: nameuser,
                description: description
            }
        })

        return data;
    }
}

export {UpdatedUserService}