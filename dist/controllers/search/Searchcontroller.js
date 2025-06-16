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
exports.SearchControler = void 0;
const SearchService_1 = require("../../services/search/SearchService");
class SearchControler {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query.query;
            if (!query || query.trim() === '') {
                res.status(400).json({ error: 'Query is required' });
                return;
            }
            const service = new SearchService_1.SearchService();
            try {
                const users = yield service.execute(query);
                res.json(users);
                return;
            }
            catch (_a) {
                res.status(500).json({ error: 'Erro interno do servidor' });
                return;
            }
        });
    }
}
exports.SearchControler = SearchControler;
