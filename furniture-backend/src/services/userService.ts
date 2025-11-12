import { PrismaClient } from "@prisma/client";
// import { PrismaClient} from "../generated/prisma/client"; // For Latest Prisma

const prisma = new PrismaClient();

export const addProductToFavourite = async (
  userId: number,
  productId: number
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      products: {
        connect: {
          id: productId,
        },
      },
    },
  });
};

export const removeProductFromFavourite = async (
  userId: number,
  productId: number
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      products: {
        disconnect: {
          id: productId,
        },
      },
    },
  });
};
