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
exports.UnLikeController = void 0;
const UnLikeService_1 = require("../../services/like/UnLikeService");
class UnLikeController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { post_id, user_id } = req.body;
            const service = new UnLikeService_1.UnLikeService();
            const like = yield service.execute({
                post_id,
                user_id,
            });
            res.json({ sucess: true });
            return;
        });
    }
}
exports.UnLikeController = UnLikeController;
