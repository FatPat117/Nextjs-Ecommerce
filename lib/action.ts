"use server";
import db from "./db";
export async function getProductBySlug(slug: string) {
        const product = await db.product.findUnique({
                where: {
                        slug: slug,
                },
        });

        if (!product) return null;
        return product;
}
