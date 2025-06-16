// services/user/GetUserProfileService.ts
import prismaClient from "../prisma";

export class GetUserProfileService {
  async execute(username: string) {
    if (!username.trim()) {
      throw new Error("Username is required");
    }

    const user = await prismaClient.user.findFirst({
      where: { nameuser: username },
      select: {
        id: true,
        nameuser: true,
        profile_img: true,
        description: true,
        posts_user: {
          select: {
            post_id: true,
            post_img_id:true,
            post_img: true,
            music_name: true,
            description_post: true,
            likes: {
              select: { user_id: true }
            },
            comments: {
              select: {
                comment: true,
                createdAt: true,
                user: {
                  select: {
                    nameuser: true,
                    profile_img: true
                  }
                }
              }
            }
          }
        },
        followers:true,
        followings:true
      },
    });

    if (!user) throw new Error('User not found');

    return user;
  }
}
