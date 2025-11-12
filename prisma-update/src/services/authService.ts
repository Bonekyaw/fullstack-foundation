import prisma from "../lib/prisma";

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
  });
};
