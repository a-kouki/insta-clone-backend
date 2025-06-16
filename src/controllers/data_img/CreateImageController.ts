import {Request, Response } from 'express'
import { CreateImageService } from '../../services/data_img/CreateImageService'
import { request } from 'http';
import {UploadedFile} from 'express-fileupload'
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

class CreateImageController{
  async handle(req: Request, res: Response){
    const {nameuser, image} = req.body;

    const createImageService = new CreateImageService();

    //verifica se enviou imagem
    if(!req.files){
      throw new Error("error upload file image")
    }else{
      //const {originalname, filename: image} = req.file;
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
      
      const img = await createImageService.execute({
        nameuser,
        image: resultFile.url,
        
      })

      res.json(img)
      return 
    }
    }

}


export { CreateImageController }
