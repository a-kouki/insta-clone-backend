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
exports.LikeController = void 0;
const LikeService_1 = require("../../services/like/LikeService");
class LikeController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.user_id;
            const { post_id } = req.body;
            const service = new LikeService_1.LikeService();
            try {
                const like = yield service.execute(id, post_id);
                res.status(201).json(like);
                return;
            }
            catch (error) {
                console.error("Erro ao curtir:", error);
                res.status(500).json({ error: "Erro interno do servidor" });
                return;
            }
        });
    }
}
exports.LikeController = LikeController;
