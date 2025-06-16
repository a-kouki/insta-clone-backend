"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProfileImageService = void 0;
// services/deletephoto/DeletePhotoService.ts
const prisma_1 = __importDefault(require("../../prisma"));
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
class DeleteProfileImageService {
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.user.findUnique({
                where: { id: userId }
            });
            if (!user)
                throw new Error("Usuário não encontrado");
            const no_pictute = 'https://res.cloudinary.com/dzvxv3uol/image/upload/nopicture_unwsbz.png';
            // Se tiver imagem antiga no Cloudinary
            if (user.profile_img_id !== no_pictute && user.profile_img_id !== "") {
                try {
                    yield cloudinary_1.v2.uploader.destroy(user.profile_img_id);
                }
                catch (err) {
                    console.error("Erro ao deletar imagem do Cloudinary:", err);
                }
            }
            // Atualiza para imagem padrão (e zera o id da imagem no cloudinary)
            yield prisma_1.default.user.update({
                where: { id: userId },
                data: {
                    profile_img: "https://res.cloudinary.com/dzvxv3uol/image/upload/nopicture_unwsbz.png", // ou uma URL pública padrão
                    profile_img_id: null,
                }
            });
            return;
        });
    }
}
exports.DeleteProfileImageService = DeleteProfileImageService;
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
