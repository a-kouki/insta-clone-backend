import { Request, Response } from "express";
import { PublishService } from "../../services/publish/PublichService";
import {UploadedFile} from 'express-fileupload'
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

class PublishController{
    async handle(req: Request, res:Response){
        const {id, image, description, music} = req.body;

        const service = new PublishService();

        //verifica se enviou imagem
        //'file' com multer ou 'files' com cloudinary
        if(!req.files){
        throw new Error("error upload file image")
        }else{
            //const {originalname, filename: image} = req.file; <- so para multer

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
           
            const post = await service.execute({
                id,
                image: resultFile.url,
                description, 
                music,
                post_img_id: resultFile.public_id,       
            })

            res.json(post)
            return
        }
    }
}

export {PublishController}