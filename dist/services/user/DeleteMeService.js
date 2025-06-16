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
exports.DeleteMeService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
class DeleteMeService {
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.user.findUnique({
                where: { id: userId }
            });
            if (!user) {
                throw new Error("Usuário não encontrado.");
            }
            // Deletar imagem do Cloudinary (se não for padrão e tiver ID salvo)
            if (user.profile_img !== "https://res.cloudinary.com/dzvxv3uol/image/upload/v1750029744/nopicture_unwsbz.png" &&
                user.profile_img_id) {
                try {
                    yield cloudinary_1.v2.uploader.destroy(user.profile_img_id);
                }
                catch (err) {
                    console.error("Erro ao deletar imagem do Cloudinary:", err);
                }
            }
            // Deletar dados relacionados
            yield prisma_1.default.like.deleteMany({
                where: { user_id: userId },
            });
            yield prisma_1.default.comment.deleteMany({
                where: { user_id: userId },
            });
            yield prisma_1.default.post.deleteMany({
                where: { user_id: userId },
            });
            yield prisma_1.default.followRelation.deleteMany({
                where: {
                    OR: [
                        { followerId: userId },
                        { followingId: userId },
                    ]
                },
            });
            // Deletar o usuário
            yield prisma_1.default.user.delete({
                where: { id: userId },
            });
        });
    }
}
exports.DeleteMeService = DeleteMeService;
