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
exports.CheckingFollowController = void 0;
const CheckingFollowService_1 = require("../services/CheckingFollowService");
class CheckingFollowController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const loggedUserId = req.user_id;
            const { profileUserId } = req.params;
            if (!profileUserId) {
                res.json(false);
                return;
            }
            const service = new CheckingFollowService_1.CheckingFollowService();
            const checkingFollow = yield service.execute(loggedUserId, profileUserId);
            const isFollowing = !!checkingFollow; // transforma em booleano
            res.json({ isFollowing });
            return;
        });
    }
}
exports.CheckingFollowController = CheckingFollowController;
