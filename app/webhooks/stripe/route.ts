import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
        const payload = await request.text();
        const signature = request.headers.get("stripe-signature");

        if (!signature) {
                return new NextResponse("Missing Stripe-Signature header", { status: 400 });
        }

        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!webhookSecret) {
                return new NextResponse("Missing Stripe webhook secret", { status: 500 });
        }

        try {
                const event = await stripe.webhooks.constructEventAsync(payload, signature, webhookSecret);

                if (event.type === "checkout.session.completed") {
                        const checkoutSession = event.data.object as Stripe.Checkout.Session;
                        const orderId = checkoutSession.metadata?.orderId;

                        if (!orderId) {
                                console.error("No order ID found in checkout session metadata");
                                return new NextResponse("No order ID found in checkout session metadata", {
                                        status: 400,
                                });
                        }

                        await db.order.update({
                                where: { id: orderId },
                                data: {
                                        status: "paid",
                                        stripePaymentIntentId: checkoutSession.payment_intent as string,
                                },
                        });
                        return new NextResponse("Order updated successfully", { status: 200 });
                } else {
                        console.warn(`Unhandled event type ${event.type}`);
                        return new NextResponse("Unhandled event type", { status: 200 });
                }
        } catch (error) {
                console.error("Stripe webhook error:", error);
                return new NextResponse("Webhook processing failed", { status: 500 });
        }
}
