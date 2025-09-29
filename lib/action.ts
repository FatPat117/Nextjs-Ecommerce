"use server";
import { Prisma } from "@/app/generated/prisma";
import db from "./db";

export interface GetProductsParams {
        query?: string;
        slug?: string;
        sort?: string | null;
        page?: number;
        pageSize?: number;
}

export async function getProductBySlug(slug: string) {
        const product = await db.product.findUnique({
                where: {
                        slug: slug,
                },
                include: {
                        category: true,
                },
        });

        if (!product) return null;
        return product;
}

export async function getProducts({ query, slug, sort, page = 1, pageSize = 3 }: GetProductsParams) {
        const where: Prisma.ProductWhereInput = {};

        if (query) {
                where.OR = [
                        { name: { contains: query, mode: "insensitive" } },
                        { description: { contains: query, mode: "insensitive" } },
                ];
        }

        if (slug) {
                where.category = {
                        slug: slug,
                };
        }

        let orderBy: Prisma.ProductOrderByWithRelationInput | undefined = undefined;
        if (sort == "price-asc") {
                orderBy = { price: "asc" };
        } else if (sort == "price-desc") {
                orderBy = { price: "desc" };
        }

        const skip = pageSize ? (page - 1) * pageSize : 0;
        const take = pageSize ? pageSize : 3;

        return await db.product.findMany({
                where,
                orderBy,
                skip,
                take,
        });
}
