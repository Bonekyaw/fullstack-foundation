import { PrismaClient } from "../../generated/prisma/index.js";
import type { PostInput } from "../types.js";

const prisma = new PrismaClient();

export const getPosts = async () => {
  return prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const getPost = async (id: string) => {
  return prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const createPost = async (input: PostInput) => {
  return prisma.post.create({
    data: {
      title: input.title,
      content: input.content,
      published: input.published,
      author: {
        connect: {
          id: input.authorId,
        },
      },
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const deletePost = async (id: string) => {
  return prisma.post.delete({
    where: { id },
  });
};
