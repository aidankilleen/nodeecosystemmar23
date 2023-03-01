import { PrismaClient } from '@prisma/client';



console.log("Prisma Test");

const prisma = new PrismaClient();

async function testInsert() {
    const member = await prisma.member.create({
        data: {
            name: "Dan", 
            email: "dan@gmail.com", 
            active: true
        }
    });
    console.log(member);
}

async function testGetMembers() {

    const members = await prisma.member.findMany()

    for (let member of members) {
        console.log(member.name);
    }
}


async function testCreateUser() {
    
    await prisma.user.create({
        data: {
            name: "Aidan Killeen", 
            email: "aidan.killeen@gmail.com", 
    
        }
    })

}


async function main() {

    const member = await prisma.member.create({
        data: {
            name: "Eve", 
            email:"eve@gmail.com", 
            active: true, 
            sales: {
                create: {
                    product: "Car", 
                    colour: "red", 
                    quantity: 1
                }
            }
        }
    })
}


main()
    .then(async() => {
        await prisma.$disconnect();
    })
    .catch(async(e)=> {
        console.error(e);

        await prisma.$disconnect();
        process.exit();
    })
