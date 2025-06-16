import prismaClient from "../../prisma";

interface CreateCommentProps {
  userId: string;
  postId: string;
  text: string;
}

class CreateCommentService {
  async execute({ userId, postId, text }: CreateCommentProps) {
    if (!text.trim()) {
      throw new Error("Empty comment");
    }

    const newComment = await prismaClient.comment.create({
      data: {
        comment: text,      
        post_id: postId,
        user_id: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            nameuser: true,
            profile_img: true,
            profile_img_id:true,
          },
        },
      },
    });

    return newComment;
  }
}

export { CreateCommentService };
