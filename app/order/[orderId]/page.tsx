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
        return (
                <main className="container mx-auto py-4">
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
