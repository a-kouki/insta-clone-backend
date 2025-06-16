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
exports.GetAllPostsService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class GetAllPostsService {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const allPosts = yield prisma_1.default.post.findMany({
                include: {
                    user: {
                        select: {
                            nameuser: true,
                            profile_img: true,
                            profile_img_id: true
                        }
                    }
                },
                take: 50, // Pegue mais posts para ter variedade
                orderBy: {
                    data_post: 'desc' // ou 'createdAt' se quiser os mais recentes
                }
            });
            // Embaralhar os resultados
            const shuffled = allPosts.sort(() => 0.5 - Math.random());
            // Pegar apenas os 10 primeiros após embaralhar
            const selected = shuffled.slice(0, 10);
            return selected.map(post => ({
                user: {
                    id: post.user.nameuser,
                    profile_img: post.user.profile_img,
                    profile_img_id: post.user.profile_img_id
                },
                post: {
                    post_id: post.post_id,
                    description_post: post.description_post,
                    data_post: post.data_post,
                    music_name: post.music_name,
                    post_img: post.post_img,
                    post_img_id: post.post_img_id,
                }
            }));
        });
    }
}
exports.GetAllPostsService = GetAllPostsService;
// class GetAllPostsService {
//   async execute() {
//     const users = await prismaClient.user.findMany({
//       take: 10,
//       orderBy: {
//         // pseudo-aleatoriedade: por exemplo, usando `Math.random()` no client e um seed
//         id: 'asc'
//       },
//       skip: Math.floor(Math.random() * 20) 
//     });
//     const posts: any[] = [];
//     for (const user of users) {
//       const userPosts = await prismaClient.post.findMany({
//         where: { user_id: user.id },
//         distinct: ['post_id'], // Tenta evitar repetição
//         take: 1,
//         orderBy: {
//           data_post: 'desc'
//         },
//         include: {
//           user: {
//             select: {
//               nameuser: true,
//               profile_img: true
//             }
//           }
//         }
//       });
//       if (userPosts.length > 0) posts.push(userPosts[0]);
//     }
//     // Embaralhar os posts
//     const shuffled = posts.sort(() => Math.random() - 0.5);
//     return shuffled.map(post => ({
//       user: {
//         id: post.user.nameuser,
//         profile_img: post.user.profile_img,
//         profile_img_id: post.user.profile_img_id
//       },
//       post: {
//         post_id: post.post_id,
//         description_post: post.description_post,
//         data_post: post.data_post,
//         music_name: post.music_name,
//         post_img: post.post_img,
//         post_img_id: post.post_img_id,
//       }
//     }));
//   }
// }
// export { GetAllPostsService };
