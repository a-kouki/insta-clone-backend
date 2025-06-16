// services/deletephoto/DeletePhotoService.ts
import prismaClient from "../../prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export class DeleteProfileImageService {
  async execute(userId: string) {
    const user = await prismaClient.user.findUnique({
      where: { id: userId }
    });

    if (!user) throw new Error("Usuário não encontrado");

    const no_pictute = 'https://res.cloudinary.com/dzvxv3uol/image/upload/nopicture_unwsbz.png'

    // Se tiver imagem antiga no Cloudinary
    if (user.profile_img_id !== no_pictute && user.profile_img_id !== "") {
      try {
        await cloudinary.uploader.destroy(user.profile_img_id);
      } catch (err) {
        console.error("Erro ao deletar imagem do Cloudinary:", err);
      }
    }

    // Atualiza para imagem padrão (e zera o id da imagem no cloudinary)
    await prismaClient.user.update({
      where: { id: userId },
      data: {
        profile_img: "https://res.cloudinary.com/dzvxv3uol/image/upload/nopicture_unwsbz.png", // ou uma URL pública padrão
        profile_img_id: null,
      }
    });

    return;
  }
}
// // services/deletephoto/DeletePhotoService.ts
// import prismaClient from "../../prisma";
// import fs from "fs";
// import path from "path";

// export class DeleteProfileImageService {
//   async execute(userId: string) {
//     const user = await prismaClient.user.findUnique({
//       where: { id: userId }
//     });
//     if (user.profile_img !== "picture_users/nopicture.png") {
//       const imagePath = path.resolve(__dirname, "..", "..","..", "temp", user.profile_img);

//       fs.access(imagePath, fs.constants.F_OK, (err) => {
//         if (!err) {
//           fs.unlink(imagePath, (unlinkErr) => {
//             if (unlinkErr) console.error("Erro ao deletar imagem:", unlinkErr.message);
//           });
//         }
//       });
//     }

//     const updatedUser = await prismaClient.user.update({
//       where: { id: userId },
//       data: { profile_img: "picture_users/nopicture.png" },
//     });
    
//     updatedUser;
//     return 
//   }
// }
