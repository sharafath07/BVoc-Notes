import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

const SALT_ROUNDS = 12;

async function main() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    const passwordHash = await bcrypt.hash(
        password,
        SALT_ROUNDS
    );

    const admin = await prisma.user.upsert({
        where: {
            email,
        },

        update: {
            passwordHash,
            role: "ADMIN",
            status: "ACTIVE",
        },

        create: {
            name: "System Administrator",
            email,
            passwordHash,
            role: "ADMIN",
            status: "ACTIVE",
        },
    });

    console.log("Admin account ready:");
    console.log({
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
    });
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });