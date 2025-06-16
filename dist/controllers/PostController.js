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
exports.GetAllPostsController = void 0;
const PostService_1 = require("../services/PostService");
class GetAllPostsController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new PostService_1.GetAllPostsService();
            const post = yield service.execute();
            res.json({ post });
            return;
        });
    }
}
exports.GetAllPostsController = GetAllPostsController;
