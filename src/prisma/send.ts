import { PrismaClient } from '../generated/prisma/client';
import usersData from '../data/users_data.json'; // seu JSON com vários usuários
import crypto from 'crypto'; // Para gerar UUIDs se necessário


const prisma = new PrismaClient();

export async function insertSeedData() {
  for (const user of usersData) {
    // Upsert do usuário
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id ||  crypto.randomUUID(),
        name: user.name,
        nameuser: user.nameuser,
        email:  user.email || `${user.nameuser}@example.com`, 
        password: user.password || '123456', 
        profile_img: user.profile_img,
        description: user.description,
        posts_user: {
          create: user.posts_user.map((post: any) => ({
            //post_id: post.post_id,
            number: Number(post.number),
            data_post: new Date(),
            music_name: post.music_name,
            post_img: post.post_img,
            description_post: post.description_post,
          }))
        },
      }
    });
  }

  // Agora os follows (seguidores)
  for (const user of usersData) {
    for (const followerId of user.follower || []) {
      try {
        await prisma.followRelation.create({
          data: {
            followerId,
            followingId: user.id,
          },
      })
      } catch (err) {
      }
    }
  }

  //console.log('Todos os usuários e seguidores foram inseridos.');
}

if (require.main === module) {
  insertSeedData()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

