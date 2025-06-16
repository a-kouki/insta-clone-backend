import express, { Request, Response, NextFunction } from 'express'
//import 'express-async-errors';
import cors from 'cors'
import path from 'path';

import { router } from './routes'
import fileUpload from 'express-fileupload';
//import { insertSeedData } from '../src/prisma/send';  


import dotenv from 'dotenv';
dotenv.config(); // Isso carrega as variáveis do .env para process.env

const app = express();
app.use(express.json());
app.use(cors()) // usar apenas em ambiente de desenvolvimento
app.use(fileUpload({
  limits:{fileSize: 50*1024*1024} //no max 50mb
}))

app.use(router);

app.use(
  '/files',
  express.static(path.resolve(__dirname,'..', 'temp'))
);

 

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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
      //Se for uma instancia do tipo error
       res.status(400).json({
        error: err.message
      })
      return
    }
    res.status(500).json({
      status: 'error',
      message: 'Internal server error.'
    })
    return
});

app.listen(process.env.PORT, () => console.log('Servidor Online!!'))