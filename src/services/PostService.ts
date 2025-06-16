import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
import prismaClient from '../prisma';


class GetAllPostsService {
  async execute() {
    const allPosts = await prismaClient.post.findMany({
      include: {
        user: {
          select: {
            nameuser: true,
            profile_img: true,
            profile_img_id: true
          }
        }
      },
      take: 50, // Pegue mais posts para ter variedade
      orderBy: {
        data_post: 'desc' // ou 'createdAt' se quiser os mais recentes
      }
    });

    // Embaralhar os resultados
    const shuffled = allPosts.sort(() => 0.5 - Math.random());

    // Pegar apenas os 10 primeiros após embaralhar
    const selected = shuffled.slice(0, 10);

    return selected.map(post => ({
      user: {
        id: post.user.nameuser,
        profile_img: post.user.profile_img,
        profile_img_id: post.user.profile_img_id
      },
      post: {
        post_id: post.post_id,
        description_post: post.description_post,
        data_post: post.data_post,
        music_name: post.music_name,
        post_img: post.post_img,
        post_img_id: post.post_img_id,
      }
    }));
  }
}

export {GetAllPostsService}

// class GetAllPostsService {
//   async execute() {
//     const users = await prismaClient.user.findMany({
//       take: 10,
//       orderBy: {
//         // pseudo-aleatoriedade: por exemplo, usando `Math.random()` no client e um seed
//         id: 'asc'
//       },
//       skip: Math.floor(Math.random() * 20) 
//     });

//     const posts: any[] = [];

//     for (const user of users) {
//       const userPosts = await prismaClient.post.findMany({
//         where: { user_id: user.id },
//         distinct: ['post_id'], // Tenta evitar repetição
//         take: 1,
//         orderBy: {
//           data_post: 'desc'
//         },
//         include: {
//           user: {
//             select: {
//               nameuser: true,
//               profile_img: true
//             }
//           }
//         }
//       });

//       if (userPosts.length > 0) posts.push(userPosts[0]);
//     }

//     // Embaralhar os posts
//     const shuffled = posts.sort(() => Math.random() - 0.5);

//     return shuffled.map(post => ({
//       user: {
//         id: post.user.nameuser,
//         profile_img: post.user.profile_img,
//         profile_img_id: post.user.profile_img_id
//       },
//       post: {
//         post_id: post.post_id,
//         description_post: post.description_post,
//         data_post: post.data_post,
//         music_name: post.music_name,
//         post_img: post.post_img,
//         post_img_id: post.post_img_id,
//       }
//     }));
//   }
// }

// export { GetAllPostsService };

