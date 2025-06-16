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
exports.CreateCommentController = void 0;
const CommentService_1 = require("../../services/comment/CommentService");
class CreateCommentController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { postId, text } = req.body;
            const userId = req.user_id;
            const service = new CommentService_1.CreateCommentService();
            try {
                const comment = yield service.execute({ userId, postId, text });
                res.json(comment);
                return;
            }
            catch (err) {
                res.status(400).json({ error: err.message });
                return;
            }
        });
    }
}
exports.CreateCommentController = CreateCommentController;
