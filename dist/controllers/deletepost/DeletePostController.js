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
exports.DeletePostController = void 0;
const DeletePostSercvice_1 = require("../../services/deletepost/DeletePostSercvice");
class DeletePostController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authedReq = req;
            const post_id = req.query.post_id;
            if (!post_id) {
                res.status(400).json({ error: "post_id é obrigatório" });
                return;
            }
            try {
                const service = new DeletePostSercvice_1.DeletePostService();
                const deletepost = yield service.execute(post_id);
                res.json({ success: true, message: "Post deletado com sucesso." });
                return;
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: "Erro interno do servidor" });
                return;
            }
        });
    }
}
exports.DeletePostController = DeletePostController;
