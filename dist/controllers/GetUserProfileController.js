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
exports.GetUserProfileController = void 0;
const GetUserProfileService_1 = require("../services/GetUserProfileService");
class GetUserProfileController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req.params;
            const service = new GetUserProfileService_1.GetUserProfileService();
            try {
                const user = yield service.execute(username);
                res.json(user);
                return;
            }
            catch (err) {
                res.status(404).json({ error: err.message });
                return;
            }
        });
    }
}
exports.GetUserProfileController = GetUserProfileController;
