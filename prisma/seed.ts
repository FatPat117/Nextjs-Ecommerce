import { Product } from "@/app/generated/prisma";
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

        const products: Omit<Product, "createdAt" | "updatedAt">[] = [
                {
                        id: "1",
                        name: "Wireless Headphones",
                        slug: "wireless-headphones",
                        description: "Premium noise-cancelling wireless headphones with long battery life.",
                        price: 199.99,
                        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
                        categoryId: electronics.id,
                },
                {
                        id: "2",
                        name: "Smart Watch",
                        slug: "smart-watch",
                        description: "Fitness tracker with heart rate monitoring and sleep analysis.",
                        price: 149.99,
                        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
                        categoryId: electronics.id,
                },
                {
                        id: "3",
                        name: "Running Shoes",
                        slug: "running-shoes",
                        description: "Lightweight running shoes with responsive cushioning.",
                        price: 89.99,
                        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
                        categoryId: sports.id,
                },
                {
                        id: "4",
                        name: "Ceramic Mug",
                        slug: "ceramic-mug",
                        description: "Handcrafted ceramic mug with minimalist design.",
                        price: 24.99,
                        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
                        categoryId: home.id,
                },
                {
                        id: "5",
                        name: "Leather Backpack",
                        slug: "leather-backpack",
                        description: "Durable leather backpack with multiple compartments.",
                        price: 24.99,
                        image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
                        categoryId: clothing.id,
                },
        ];

        await db.product.createMany({
                data: products,
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
