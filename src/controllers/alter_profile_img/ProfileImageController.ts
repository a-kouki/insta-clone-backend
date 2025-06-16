import { Request, Response } from "express";
import { ProfileImageService } from "../../services/alter_profile_img/ProfileImageService";
import {UploadedFile} from 'express-fileupload'
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

export class ProfileImageController {
  async handle(req: Request, res: Response) {
    const userId = req.user_id;

    if (!req.files) {
      res.status(400).json({ error: "Nenhuma imagem enviada." });
      return 
    }

    try {
      const service = new ProfileImageService();

      const file: UploadedFile = req.files['files']

      const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({}, function(error, result){
          if(error){
              reject(error);
              return;
          }

          resolve(result)
          }).end(file.data)
      })      

      const updatedUser = await service.execute({
        userId,
         //filename: req.file.filename,
        filename: resultFile.url,
        profile_img_id: resultFile.public_id
      });
      
      res.status(200).json({ message: "Imagem atualizada com sucesso", user: updatedUser });
      return 
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar imagem de perfil." });
      return 
    }
  }
}
