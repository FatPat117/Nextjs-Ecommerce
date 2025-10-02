import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { notFound } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
        const sessionId = request.nextUrl.searchParams.get("session_id");
        if (!sessionId) {
                notFound();
        }

        try {
                const session = await stripe.checkout.sessions.retrieve(sessionId);
                const orderId = session.metadata?.orderId;

                if (!orderId) {
                        notFound();
                }

                const order = await db.order.findUnique({
                        where: {
                                id: orderId,
                                stripeSessionId: sessionId,
                        },
                });
                if (!order) {
                        return notFound();
                }

                if (order.status == "pending_payment") {
                        await db.order.update({
                                where: {
                                        id: orderId,
                                },
                                data: {
                                        status: "pending",
                                        stripeSessionId: null,
                                },
                        });
                }

                return NextResponse.redirect(new URL("/", request.url));
        } catch (error) {
                console.error("Error retrieving session", error);
        }

        return NextResponse.redirect(new URL("/cart", request.url));
}
