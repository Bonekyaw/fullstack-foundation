import prisma from "../lib/prisma";

export const UserService = {
  async create(user: { name: string; email: string }) {
    return await prisma.user.create({
      data: user,
    });
  },
};
