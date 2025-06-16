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
exports.CreateCommentService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateCommentService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, postId, text }) {
            if (!text.trim()) {
                throw new Error("Empty comment");
            }
            const newComment = yield prisma_1.default.comment.create({
                data: {
                    comment: text,
                    post_id: postId,
                    user_id: userId,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            nameuser: true,
                            profile_img: true,
                            profile_img_id: true,
                        },
                    },
                },
            });
            return newComment;
        });
    }
}
exports.CreateCommentService = CreateCommentService;
