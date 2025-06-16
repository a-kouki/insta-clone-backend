import prismaClient from "../../prisma";

interface ImageRequest{
  nameuser: string;
  image: string;
}

class CreateImageService{
  async execute({nameuser, image}: ImageRequest){

    const product = await prismaClient.imageTeste.create({
      data:{     
        nameuser: nameuser,   
        image: image,
      }
    })

    return product;

  }
}

export { CreateImageService }

