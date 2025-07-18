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
exports.GetUserProfileService = void 0;
// services/user/GetUserProfileService.ts
const prisma_1 = __importDefault(require("../prisma"));
class GetUserProfileService {
    execute(username) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!username.trim()) {
                throw new Error("Username is required");
            }
            const user = yield prisma_1.default.user.findFirst({
                where: { nameuser: username },
                select: {
                    id: true,
                    nameuser: true,
                    profile_img: true,
                    description: true,
                    posts_user: {
                        select: {
                            post_id: true,
                            post_img_id: true,
                            post_img: true,
                            music_name: true,
                            description_post: true,
                            likes: {
                                select: { user_id: true }
                            },
                            comments: {
                                select: {
                                    comment: true,
                                    createdAt: true,
                                    user: {
                                        select: {
                                            nameuser: true,
                                            profile_img: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    followers: true,
                    followings: true
                },
            });
            if (!user)
                throw new Error('User not found');
            return user;
        });
    }
}
exports.GetUserProfileService = GetUserProfileService;
