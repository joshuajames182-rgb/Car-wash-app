import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.serviceType.count();
  if (existing === 0) {
    await prisma.serviceType.createMany({
      data: [
        { name: 'Basic Wash', description: 'Exterior wash and dry', basePrice: 2500 },
        { name: 'Deluxe Wash', description: 'Exterior + interior vacuum', basePrice: 4500 },
        { name: 'Premium Detail', description: 'Full detail inside and out', basePrice: 9000 },
      ],
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

