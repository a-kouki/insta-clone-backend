import prismaClient from "../../prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export class DeleteMeService {
  async execute(userId: string) {
    const user = await prismaClient.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    // Deletar imagem do Cloudinary (se não for padrão e tiver ID salvo)
    if (
      user.profile_img !== "https://res.cloudinary.com/dzvxv3uol/image/upload/v1750029744/nopicture_unwsbz.png" &&
      user.profile_img_id
    ) {
      try {
        await cloudinary.uploader.destroy(user.profile_img_id);
      } catch (err) {
        console.error("Erro ao deletar imagem do Cloudinary:", err);
      }
    }

    // Deletar dados relacionados
    await prismaClient.like.deleteMany({
      where: { user_id: userId },
    });

    await prismaClient.comment.deleteMany({
      where: { user_id: userId },
    });

    await prismaClient.post.deleteMany({
      where: { user_id: userId },
    });

    await prismaClient.followRelation.deleteMany({
      where: {
        OR: [
          { followerId: userId },
          { followingId: userId },
        ]
      },
    });

    // Deletar o usuário
    await prismaClient.user.delete({
      where: { id: userId },
    });
  }
}
