import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    const student = await prisma.studentRegistry.upsert({
        where: {
            registerNumber: "BVOC2024001",
        },

        update: {},

        create: {
            registerNumber: "BVOC2024001",
            name: "Test Student",
            batch: "2024",
            isActive: true,
        },
    });

    console.log("Student added to registry:");
    console.log(student);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });