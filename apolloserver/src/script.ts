import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");

  await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@gmail.com",
      posts: {
        create: [
          {
            title: "Hello World",
            content: "This is my first post",
            published: true,
          },
          {
            title: "My Second Post",
            content: "This is my Second post",
            published: false,
          },
        ],
      },
    },
  });
  console.log("Created user with posts: Alice");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
