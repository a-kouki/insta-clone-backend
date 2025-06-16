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
exports.PublishController = void 0;
const PublichService_1 = require("../../services/publish/PublichService");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
class PublishController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, image, description, music } = req.body;
            const service = new PublichService_1.PublishService();
            //verifica se enviou imagem
            //'file' com multer ou 'files' com cloudinary
            if (!req.files) {
                throw new Error("error upload file image");
            }
            else {
                //const {originalname, filename: image} = req.file; <- so para multer
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
                const post = yield service.execute({
                    id,
                    image: resultFile.url,
                    description,
                    music,
                    post_img_id: resultFile.public_id,
                });
                res.json(post);
                return;
            }
        });
    }
}
exports.PublishController = PublishController;
