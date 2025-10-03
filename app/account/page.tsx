import Breadcrumbs from "@/components/Breadcrumbs";
import OrderStatusBadge from "@/components/OrderStatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

const AccountPage = async () => {
        const session = await auth();
        const userId = session?.user?.id;
        if (!userId) {
                redirect("/auth/signin");
        }
        const orders = await db.order.findMany({
                where: {
                        userId,
                },
        });

        return (
                <main className="container mx-auto py-4">
                        <Breadcrumbs
                                items={[
                                        {
                                                label: "My Account",
                                                href: "/account",
                                                active: true,
                                        },
                                ]}
                        />

                        <Table>
                                <TableHeader>
                                        <TableRow>
                                                <TableHead>Order #</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Total</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Actions</TableHead>
                                        </TableRow>
                                </TableHeader>
                                <TableBody>
                                        {orders.length === 0 && (
                                                <TableRow>
                                                        <TableCell colSpan={5} className="h-24 text-center">
                                                                No orders found
                                                        </TableCell>
                                                </TableRow>
                                        )}
                                        {orders.map((order) => (
                                                <TableRow key={order.id}>
                                                        <TableCell>{order.id.slice(0, 8)}...</TableCell>
                                                        <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
                                                        <TableCell>{formatPrice(order.total)}</TableCell>
                                                        <TableCell>
                                                                <OrderStatusBadge status={order.status} />
                                                        </TableCell>
                                                        <TableCell>
                                                                <Link className="underline" href={`/order/${order.id}`}>
                                                                        View
                                                                </Link>
                                                        </TableCell>
                                                </TableRow>
                                        ))}
                                </TableBody>
                        </Table>
                </main>
        );
};

export default AccountPage;
