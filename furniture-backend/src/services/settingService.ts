import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSettingStatus = async (key: string) => {
  return prisma.setting.findUnique({
    where: { key },
  });
};

export const createOrUpdateSettingStatus = async (
  key: string,
  value: string
) => {
  return prisma.setting.upsert({
    where: { key },
    update: {
      value,
    },
    create: {
      key,
      value,
    },
  });
};
