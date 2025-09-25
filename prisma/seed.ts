import db from "@/lib/db";
async function seed() {
        await db.product.deleteMany();
        await db.category.deleteMany();

        const electronics = await db.category.create({
                data: {
                        name: "Electronics",
                        slug: "electronics",
                },
        });

        const clothing = await db.category.create({
                data: {
                        name: "Clothing",
                        slug: "clothing",
                },
        });

        const home = await db.category.create({
                data: {
                        name: "Home",
                        slug: "home",
                },
        });

        const sports = await db.category.create({
                data: {
                        name: "Sports",
                        slug: "sports",
                },
        });
}

seed()
        .then(async () => {
                console.log("Database seeded successfully");
                await db.$disconnect();
        })
        .catch(async (error) => {
                console.error(error);
                await db.$disconnect();
                process.exit(1);
        });
