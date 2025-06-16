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
exports.insertSeedData = insertSeedData;
const client_1 = require("../generated/prisma/client");
const users_data_json_1 = __importDefault(require("../data/users_data.json")); // seu JSON com vários usuários
const crypto_1 = __importDefault(require("crypto")); // Para gerar UUIDs se necessário
const prisma = new client_1.PrismaClient();
function insertSeedData() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const user of users_data_json_1.default) {
            // Upsert do usuário
            yield prisma.user.upsert({
                where: { id: user.id },
                update: {},
                create: {
                    id: user.id || crypto_1.default.randomUUID(),
                    name: user.name,
                    nameuser: user.nameuser,
                    email: user.email || `${user.nameuser}@example.com`,
                    password: user.password || '123456',
                    profile_img: user.profile_img,
                    description: user.description,
                    posts_user: {
                        create: user.posts_user.map((post) => ({
                            //post_id: post.post_id,
                            number: Number(post.number),
                            data_post: new Date(),
                            music_name: post.music_name,
                            post_img: post.post_img,
                            description_post: post.description_post,
                        }))
                    },
                }
            });
        }
        // Agora os follows (seguidores)
        for (const user of users_data_json_1.default) {
            for (const followerId of user.follower || []) {
                try {
                    yield prisma.followRelation.create({
                        data: {
                            followerId,
                            followingId: user.id,
                        },
                    });
                }
                catch (err) {
                }
            }
        }
        //console.log('Todos os usuários e seguidores foram inseridos.');
    });
}
if (require.main === module) {
    insertSeedData()
        .catch((e) => {
        console.error(e);
        process.exit(1);
    })
        .finally(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
    }));
}
