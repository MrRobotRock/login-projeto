// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando o seeding...');

    const roleAdm = await prisma.role.upsert({
        where: { nome: 'ADM' },
        update: {},
        create: {
            nome: 'ADM',
        },
    });

    const roleGerente = await prisma.role.upsert({
        where: { nome: 'GERENTE' },
        update: {},
        create: {
            nome: 'GERENTE',
        },
    });

    const roleComum = await prisma.role.upsert({
        where: { nome: 'COMUM' },
        update: {},
        create: {
            nome: 'COMUM',
        },
    });

    console.log('Roles criadas com sucesso:');
    console.log({ roleAdm, roleGerente, roleComum });
    console.log('Seeding finalizado!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });