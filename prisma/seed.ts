import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create a poll
  const poll1 = await prisma.poll.upsert({
    where: { id: 1 },
    update: {},
    create: {
      question: 'What is your favorite color?',
      options: ['Blue', 'Green', 'Red', 'Yellow'].join(','),
    },
  });

  console.log({ poll1: poll1 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
