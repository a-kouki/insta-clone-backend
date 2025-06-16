"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import 'express-async-errors';
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
//import { insertSeedData } from '../src/prisma/send';  
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Isso carrega as variáveis do .env para process.env
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)()); // usar apenas em ambiente de desenvolvimento
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 } //no max 50mb
}));
app.use(routes_1.router);
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'temp')));
// Executar o seed uma vez quando o servidor iniciar 
/*
(async () => {
  try {
    await insertSeedData();
    console.log('Seed data inserted!');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
})();*/
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        //Se for uma instancia do tipo error
        res.status(400).json({
            error: err.message
        });
        return;
    }
    res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
    return;
});
app.listen(process.env.PORT, () => console.log('Servidor Online!!'));
