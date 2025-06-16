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
exports.ListFollowService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListFollowService {
    execute(userId, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === 'followings') {
                const followings = yield prisma_1.default.followRelation.findMany({
                    where: { followerId: userId },
                    include: {
                        following: {
                            select: {
                                id: true,
                                nameuser: true,
                                name: true,
                                profile_img: true,
                                profile_img_id: true,
                            },
                        },
                    },
                });
                return followings.map(f => f.following);
            }
            if (type === 'followers') {
                const followers = yield prisma_1.default.followRelation.findMany({
                    where: { followingId: userId },
                    include: {
                        follower: {
                            select: {
                                id: true,
                                nameuser: true,
                                name: true,
                                profile_img: true,
                                profile_img_id: true,
                            },
                        },
                    },
                });
                return followers.map(f => f.follower);
            }
        });
    }
}
exports.ListFollowService = ListFollowService;
