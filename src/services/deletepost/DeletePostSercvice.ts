import fs from 'fs'
import path from 'path'
import prismaClient from '../../prisma'
import {UploadedFile} from 'express-fileupload'
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

class DeletePostService {
  async execute(post_id: string) {
    const post = await prismaClient.post.findUnique({
      where: { post_id },
    })

    if (!post) {
      throw new Error('Post não encontrado')
    }

    // Deleta likes e comentários
    await prismaClient.like.deleteMany({ where: { post_id } })
    await prismaClient.comment.deleteMany({ where: { post_id } })

    // Deleta o post
    await prismaClient.post.delete({ where: { post_id } })

    // Remove a imagem associada
    if (post.post_img_id) {
      try {
        await cloudinary.uploader.destroy(post.post_img_id);
      } catch (err) {
        console.error('Erro ao deletar imagem do Cloudinary:', err);
      }
    }
  }
}

export { DeletePostService }
