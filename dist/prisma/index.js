"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//iniciando prisma
//import { PrismaClient } from '../generated/prisma/client'
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
exports.default = prismaClient;
