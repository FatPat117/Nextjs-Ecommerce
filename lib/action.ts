"use server";
import { Prisma } from "@/app/generated/prisma";
import { revalidateTag, unstable_cache } from "next/cache";
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

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
        include: { product: true };
}>;

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
        if (!cartId) return null;

        return unstable_cache(
                async (id: string) => {
                        return await db.cart.findUnique({
                                where: {
                                        id: id,
                                },
                                include: {
                                        items: {
                                                include: {
                                                        product: true,
                                                },
                                                orderBy: {
                                                        createdAt: "desc",
                                                },
                                        },
                                },
                        });
                },
                ["cart", cartId],
                { tags: ["cart", cartId] }
        )(cartId);
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

export async function getOrCreateCart(): Promise<CartWithProduct> {
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

export async function addToCart(productId: string, quantity: number = 1) {
        if (quantity < 1) {
                throw new Error("Quantity must be at least 1");
        }

        const cart = await getOrCreateCart();
        const existingItem = cart.items.find((item) => item.productId === productId);

        if (existingItem) {
                await db.cartItem.update({
                        where: {
                                id: existingItem.id,
                        },
                        data: {
                                quantity: existingItem.quantity + quantity,
                        },
                        include: {
                                product: true,
                        },
                });
        } else {
                await db.cartItem.create({
                        data: {
                                cartId: cart.id, // <-- nhờ dòng này mà CartItem liên kết với Cart
                                productId: productId,
                                quantity: quantity,
                        },
                });
        }
        revalidateTag("cart");
}

export async function setProductQuantity({ productId, quantity }: { productId: string; quantity: number }) {
        if (quantity < 0) {
                throw new Error("Quantity must be at least 0");
        }
        const cart = await getCart();

        if (!cart) {
                throw new Error("Cart not found");
        }

        try {
                if (quantity == 0) {
                        await db.cartItem.deleteMany({
                                where: {
                                        cartId: cart.id,
                                        productId: productId,
                                },
                        });
                        revalidateTag("cart");
                } else {
                        await db.cartItem.updateMany({
                                where: {
                                        cartId: cart.id,
                                        productId: productId,
                                },
                                data: {
                                        quantity: quantity,
                                },
                        });
                }
                revalidateTag("cart");
        } catch (error) {
                console.error(error);
                throw new Error("Failed to set product quantity");
        }
}
