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
exports.DeletePostService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
class DeletePostService {
    execute(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield prisma_1.default.post.findUnique({
                where: { post_id },
            });
            if (!post) {
                throw new Error('Post não encontrado');
            }
            // Deleta likes e comentários
            yield prisma_1.default.like.deleteMany({ where: { post_id } });
            yield prisma_1.default.comment.deleteMany({ where: { post_id } });
            // Deleta o post
            yield prisma_1.default.post.delete({ where: { post_id } });
            // Remove a imagem associada
            if (post.post_img_id) {
                try {
                    yield cloudinary_1.v2.uploader.destroy(post.post_img_id);
                }
                catch (err) {
                    console.error('Erro ao deletar imagem do Cloudinary:', err);
                }
            }
        });
    }
}
exports.DeletePostService = DeletePostService;
