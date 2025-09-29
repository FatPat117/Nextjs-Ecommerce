"use server";
import { Prisma } from "@/app/generated/prisma";
import { cookies } from "next/headers";
import db from "./db";

export interface GetProductsParams {
        query?: string;
        slug?: string;
        sort?: string | null;
        page?: number;
        pageSize?: number;
}

export type CartWithProduct = Prisma.CartGetPayload<{
        include: {
                items: {
                        include: { product: true };
                };
        };
}>;

export type ShoppingCart = CartWithProduct & {
        size: number;
        subTotal: number;
};

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

async function findCartFromCookies(): Promise<CartWithProduct | null> {
        const cartId = (await cookies()).get("cartId")?.value;

        const cart = await db.cart.findUnique({
                where: {
                        id: cartId,
                },
                include: {
                        items: {
                                include: {
                                        product: true,
                                },
                        },
                },
        });

        if (!cart) return null;
        return cart;
}

export async function getCart(): Promise<ShoppingCart | null> {
        const cart = await findCartFromCookies();

        if (!cart) return null;

        return {
                ...cart,
                size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
                subTotal: cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
        };
}

async function getOrCreateCart(): Promise<CartWithProduct> {
        const cart = await findCartFromCookies();

        if (!cart) {
                const newCart = await db.cart.create({
                        data: {},
                        include: { items: { include: { product: true } } },
                });
                (await cookies()).set("cartId", newCart.id, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 60 * 60 * 24 * 30,
                        sameSite: "lax",
                });
                return newCart;
        }
        return cart;
}
