import Breadcrumbs from "@/components/Breadcrumbs";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import OrderItem from "./OrderItem";
import OrderSummary from "./OrderSummary";

interface OrderPageProps {
        params: Promise<{ orderId: string }>;
}

const OrderDetailPage = async ({ params }: OrderPageProps) => {
        const { orderId } = await params;
        const order = await db.order.findUnique({
                where: {
                        id: orderId,
                },
                include: {
                        items: {
                                include: { product: true },
                        },
                },
        });
        if (!order) {
                notFound();
        }
        const session = await auth();
        const userId = session?.user?.id;
        const isOwner = order.userId === userId;
        return (
                <main className="container mx-auto py-4">
                        {isOwner && (
                                <Breadcrumbs
                                        items={[
                                                { label: "My Account", href: "/account" },
                                                { label: "Order", href: `/order/${orderId}` },
                                        ]}
                                />
                        )}

                        <ul>
                                {order.items.map((item) => (
                                        <OrderItem key={item.id} orderItem={item} />
                                ))}
                        </ul>

                        <OrderSummary order={order} />
                </main>
        );
};

export default OrderDetailPage;
