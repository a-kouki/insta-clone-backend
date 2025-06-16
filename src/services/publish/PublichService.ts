import prismaClient from "../../prisma";
import { v4 as uuidv4 } from 'uuid'


interface Publish{
    id: string;
    image: string;
    description: string | null;
    music:string | null;
    post_img_id: string | null;
}

class PublishService{
    async execute({id, image, description, music, post_img_id} : Publish){
        const postId = uuidv4() 

        const post = await prismaClient.post.create({
            data:{
                user_id: id,
                post_id: postId,
                post_img_id: post_img_id,
                data_post: new Date(),
                number: 0,
                post_img: image,
                music_name: music,
                description_post: description,
            }
        })

        return post;
    }
}

export {PublishService}