import { prisma } from "./prismaClient";

export const createOneProduct = async (data: any) => {
  const productdata: any = {
    name: data.name,
    description: data.description,
    price: data.price,
    discount: data.discount,
    inventory: data.inventory,
    category: {
      connectOrCreate: {
        where: { name: data.category },
        create: {
          name: data.category,
        },
      },
    },
    type: {
      connectOrCreate: {
        where: { name: data.type },
        create: {
          name: data.type,
        },
      },
    },
    images: {
      create: data.images,
    },
  };

  if (data.tags && data.tags.length > 0) {
    productdata.tags = {
      connectOrCreate: data.tags.map((tagName: string) => ({
        where: { name: tagName },
        create: {
          name: tagName,
        },
      })),
    };
  }
  return prisma.product.create({ data: productdata });
};

export const getProductById = async (id: number) => {
  return prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
    },
  });
};

export const updateOneProduct = async (productId: number, data: any) => {
  const productdata: any = {
    name: data.name,
    description: data.description,
    price: data.price,
    discount: data.discount,
    inventory: data.inventory,
    category: {
      connectOrCreate: {
        where: { name: data.category },
        create: {
          name: data.category,
        },
      },
    },
    type: {
      connectOrCreate: {
        where: { name: data.type },
        create: {
          name: data.type,
        },
      },
    },
  };

  if (data.tags && data.tags.length > 0) {
    productdata.tags = {
      set: [],
      connectOrCreate: data.tags.map((tagName: string) => ({
        where: { name: tagName },
        create: {
          name: tagName,
        },
      })),
    };
  }

  if (data.images && data.images.length > 0) {
    productdata.images = {
      deleteMany: {},
      create: data.images,
    };
  }

  return prisma.product.update({
    where: { id: productId },
    data: productdata,
  });
};

export const deleteOneProduct = async (id: number) => {
  return prisma.product.delete({
    where: { id },
  });
};

export const getProductWithRelations = async (id: number) => {
  return prisma.product.findUnique({
    where: { id },
    omit: {
      categoryId: true,
      typeId: true,
      createdAt: true,
      updatedAt: true,
    },
    include: {
      images: {
        select: {
          id: true,
          path: true,
        },
      },
    },
  });
};

export const getProductsList = async (options: any) => {
  return prisma.product.findMany(options);
};

export const getCategoryList = async () => {
  return prisma.category.findMany();
};

export const getTypeList = async () => {
  return prisma.type.findMany();
};
