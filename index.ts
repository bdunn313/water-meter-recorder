import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.reading.create({ data: { value: 1200.34 } });
  const allReadings = await prisma.reading.findMany();
  console.dir(allReadings, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => await prisma.$disconnect());
