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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileImageController = void 0;
const ProfileImageService_1 = require("../../services/alter_profile_img/ProfileImageService");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
class ProfileImageController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user_id;
            if (!req.files) {
                res.status(400).json({ error: "Nenhuma imagem enviada." });
                return;
            }
            try {
                const service = new ProfileImageService_1.ProfileImageService();
                const file = req.files['files'];
                const resultFile = yield new Promise((resolve, reject) => {
                    cloudinary_1.v2.uploader.upload_stream({}, function (error, result) {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(result);
                    }).end(file.data);
                });
                const updatedUser = yield service.execute({
                    userId,
                    //filename: req.file.filename,
                    filename: resultFile.url,
                    profile_img_id: resultFile.public_id
                });
                res.status(200).json({ message: "Imagem atualizada com sucesso", user: updatedUser });
                return;
            }
            catch (error) {
                res.status(500).json({ error: "Erro ao atualizar imagem de perfil." });
                return;
            }
        });
    }
}
exports.ProfileImageController = ProfileImageController;
