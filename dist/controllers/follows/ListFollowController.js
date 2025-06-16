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
exports.ListFollowController = void 0;
const ListFollowService_1 = require("../../services/follows/ListFollowService");
class ListFollowController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type } = req.params;
            const { userId } = req.query;
            const service = new ListFollowService_1.ListFollowService();
            try {
                const result = yield service.execute(userId, type);
                res.json(result);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    }
}
exports.ListFollowController = ListFollowController;
