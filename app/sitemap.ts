import db from "@/lib/db";

export default async function Sitemap() {
        const baseUrl = process.env.NEXT_PUBLIC_URL;
        const products = await db.product.findMany({
                select: {
                        slug: true,
                },
        });
        const categories = await db.category.findMany({
                select: {
                        slug: true,
                },
        });
        return [
                {
                        url: `${baseUrl}/`,
                        lastModified: new Date().toISOString(),
                },
                ...products.map((product) => ({
                        url: `${baseUrl}/product/${product.slug}`,
                        lastModified: new Date().toISOString(),
                })),
                ...categories.map((category) => ({
                        url: `${baseUrl}/category/${category.slug}`,
                        lastModified: new Date(),
                })),
        ];
}
