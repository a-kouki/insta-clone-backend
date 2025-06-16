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
exports.CheckPostOwnerController = void 0;
const CheckingPostService_1 = require("../../services/checkingPost/CheckingPostService");
class CheckPostOwnerController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authedReq = req;
            const post_id = req.query.post_id;
            if (!post_id) {
                res.status(400).json({ error: "post_id é obrigatório" });
                return;
            }
            try {
                const service = new CheckingPostService_1.CheckingPostService();
                const post = yield service.execute(post_id);
                if (!post) {
                    res.status(404).json({ error: "Post não encontrado" });
                    return;
                }
                const isOwner = post.user_id === authedReq.user_id;
                res.json({ isOwner });
                return;
            }
            catch (err) {
                res.status(500).json({ error: "Erro interno do servidor" });
                return;
            }
        });
    }
}
exports.CheckPostOwnerController = CheckPostOwnerController;
