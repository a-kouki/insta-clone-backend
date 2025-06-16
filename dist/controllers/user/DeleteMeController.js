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
exports.DeleteMeController = void 0;
const DeleteMeService_1 = require("../../services/user/DeleteMeService");
class DeleteMeController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user_id;
            const service = new DeleteMeService_1.DeleteMeService();
            yield service.execute(userId);
            res.status(200).json({ message: "User delete with sucess." });
        });
    }
}
exports.DeleteMeController = DeleteMeController;
