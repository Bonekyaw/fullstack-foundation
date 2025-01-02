import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserByPhone = async (phone: string) => {
  return prisma.user.findUnique({
    where: { phone },
  });
};

export const createOtp = async (otpData: any) => {
  return prisma.otp.create({
    data: otpData,
  });
};
