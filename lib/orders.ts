"use server";

import { cookies } from "next/headers";
import db from "./db";
import { createCheckoutSession, OrderWithItemsAndProduct } from "./stripe";

export type ProcessCheckoutResponse = {
        order: OrderWithItemsAndProduct;
        sessionUrl: string;
};

export async function createOrder() {
        const cartId = (await cookies()).get("cartId")?.value;

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

        let orderId: null | string = null;
        // Calculate total price

        // Create Order Record

        // Create OrderItem Record

        // Clear Cart

        // Revalidate Cache

        // Return order

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
                orderId = order.id;
                // 1. Reload full order

                const fullOrder = await db.order.findUnique({
                        where: {
                                id: order.id,
                        },
                        include: {
                                items: {
                                        include: { product: true },
                                        orderBy: {
                                                createdAt: "desc",
                                        },
                                },
                        },
                });

                // 2. Confirm the order was loaded
                if (!fullOrder) throw new Error("Order not found");

                // 3. Create Stripe Session
                const { sessionId, sessionUrl } = await createCheckoutSession(fullOrder);

                // 4. Return the session url and handle the erros
                if (!sessionId || !sessionUrl) throw new Error("Failed to create Stripe Session");

                // 5. Store the session id in the order & change the order status
                await db.order.update({
                        where: {
                                id: order.id,
                        },
                        data: {
                                stripeSessionId: sessionId,
                                status: "pending_payment",
                        },
                });

                // 6.Clear the cart
                (await cookies()).delete("cartId");
                return { order: fullOrder, sessionUrl };
        } catch (error) {
                if (orderId && error instanceof Error && error.message.includes("Stripe")) {
                        await db.order.update({
                                where: {
                                        id: orderId,
                                },
                                data: {
                                        status: "failed",
                                },
                        });
                }
                console.error("Error creating order", error);
                throw new Error("Failed to create Order");
        }
}
