import prismaClient from "../../prisma";
import { v2 as cloudinary } from "cloudinary";

interface ExecuteProps {
  userId: string;
  filename: string; // esse será o public_id da nova imagem
  profile_img_id:string,
}

export class ProfileImageService {
  async execute({ userId, filename, profile_img_id }: ExecuteProps) {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    const no_picture = 'https://res.cloudinary.com/dzvxv3uol/image/upload/nopicture_unwsbz.png'

    if (user?.profile_img !== no_picture) {
      try {
        await cloudinary.uploader.destroy(user.profile_img_id);
      } catch (err) {
        //console.error("Erro ao deletar imagem do Cloudinary:", err);
      }
    }

    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: { profile_img: filename,
            profile_img_id: profile_img_id
       }, 
    });

    return updatedUser;
  }
}


// import prismaClient from "../../prisma";
// import fs from 'fs'
// import path from 'path'


// interface ExecuteProps {
//   userId: string;
//   filename: string;
// }

// export class ProfileImageService {
//   async execute({ userId, filename }: ExecuteProps) {

//     const user = await prismaClient.user.findUnique({
//       where: { id: userId },
//     });

//     if (user?.profile_img) {
//       const imagePath = path.resolve(__dirname, "..", "..","..", "temp", user.profile_img);

//       fs.access(imagePath, fs.constants.F_OK, (err) => {
//         if (!err) {
//           fs.unlink(imagePath, (unlinkErr) => {
//             if (unlinkErr) {
//               console.error("Erro ao deletar imagem antiga:", unlinkErr.message);
//             }
//           });
//         }
//       });
//     }

//     const profileImg = await prismaClient.user.update({
//       where: { id: userId },
//       data: { profile_img: filename },
//     });
  
//     profileImg;
//     return 
//   }
// }