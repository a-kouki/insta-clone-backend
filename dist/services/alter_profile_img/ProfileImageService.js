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
exports.ProfileImageService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const cloudinary_1 = require("cloudinary");
class ProfileImageService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, filename, profile_img_id }) {
            const user = yield prisma_1.default.user.findUnique({
                where: { id: userId },
            });
            const no_picture = 'https://res.cloudinary.com/dzvxv3uol/image/upload/nopicture_unwsbz.png';
            if ((user === null || user === void 0 ? void 0 : user.profile_img) !== no_picture) {
                try {
                    yield cloudinary_1.v2.uploader.destroy(user.profile_img_id);
                }
                catch (err) {
                    //console.error("Erro ao deletar imagem do Cloudinary:", err);
                }
            }
            const updatedUser = yield prisma_1.default.user.update({
                where: { id: userId },
                data: { profile_img: filename,
                    profile_img_id: profile_img_id
                },
            });
            return updatedUser;
        });
    }
}
exports.ProfileImageService = ProfileImageService;
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
