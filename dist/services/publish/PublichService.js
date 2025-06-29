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
exports.PublishService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const uuid_1 = require("uuid");
class PublishService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, image, description, music, post_img_id }) {
            const postId = (0, uuid_1.v4)();
            const post = yield prisma_1.default.post.create({
                data: {
                    user_id: id,
                    post_id: postId,
                    post_img_id: post_img_id,
                    data_post: new Date(),
                    number: 0,
                    post_img: image,
                    music_name: music,
                    description_post: description,
                }
            });
            return post;
        });
    }
}
exports.PublishService = PublishService;
