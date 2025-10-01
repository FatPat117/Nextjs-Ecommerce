"use server";

import { cookies } from "next/headers";
import db from "./db";

export async function createOrder() {
        const cartId = (await cookies()).get("cardId")?.value;

        if (!cartId) return;

        const cart = await db.cart.findUnique({
                where: {
                        id: cartId,
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

        if (!cart || cart.items.length === 0) return;

        try {
                const order = await db.$transaction(async (tx) => {
                        const total = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
                        const newOrder = await tx.order.create({
                                data: {
                                        total,
                                },
                        });

                        const orderItems = cart.items.map((item) => ({
                                orderId: newOrder.id, // foreign key
                                productId: item.productId,
                                quantity: item.quantity,
                                price: item.product.price,
                        }));

                        // Create OrderItems
                        await tx.orderItem.createMany({ data: orderItems });

                        // Clear Cart Items
                        await tx.cartItem.deleteMany({
                                where: {
                                        cartId: cart.id,
                                },
                        });

                        // Clear Cart
                        await tx.cart.delete({
                                where: {
                                        id: cart.id,
                                },
                        });

                        return newOrder;
                });
                (await cookies()).delete("cartId");
                return order;
        } catch (error) {
                console.error("Error creating order", error);
                throw new Error("Failed to create Order");
        }

        // Calculate total price

        // Create Order Record

        // Create OrderItem Record

        // Clear Cart

        // Revalidate Cache

        // Return order
}
