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
exports.CreateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
class CreateUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, nameuser, email, password }) {
            if (!email) {
                throw new Error('email: Email is required');
            }
            if (!nameuser) {
                throw new Error('nameuser: Name user is required');
            }
            if (!password) {
                throw new Error('password: Password is required');
            }
            // Verifica se o email já está em uso
            const userByEmail = yield prisma_1.default.user.findUnique({
                where: { email: email }
            });
            if (userByEmail) {
                throw new Error('email: Email is invalid');
            }
            // Verifica se o nome de usuário já está em uso
            const userByNameuser = yield prisma_1.default.user.findUnique({
                where: { nameuser: nameuser }
            });
            if (userByNameuser) {
                throw new Error('nameuser: Name user is invalid ');
            }
            // Criptografa a senha
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8);
            // Cria o usuário
            const user = yield prisma_1.default.user.create({
                data: {
                    name,
                    nameuser,
                    email,
                    password: passwordHash,
                    profile_img: 'https://res.cloudinary.com/dzvxv3uol/image/upload/v1750029744/nopicture_unwsbz.png',
                },
                select: {
                    id: true,
                    name: true,
                    nameuser: true,
                    email: true,
                    profile_img: true,
                    //profile_img_id:true,
                }
            });
            return user;
        });
    }
}
exports.CreateUserService = CreateUserService;
