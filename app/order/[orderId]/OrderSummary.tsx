import { Badge } from "@/components/ui/badge";
import { OrderWithItemsAndProduct } from "@/lib/stripe";
import { formatPrice } from "@/lib/utils";
interface OrderSummaryProps {
        order: OrderWithItemsAndProduct;
}

function StatusBadge({ status }: { status: string }) {
        const statusMap: Record<string, string> = {
                pending: "Pending",
                pending_payment: "Pending Payment",
                failed: "Failed",
                paid: "Paid",
        };
        return <Badge variant={"outline"}>{statusMap[status]}</Badge>;
}

const OrderSummary = async ({ order }: OrderSummaryProps) => {
        return (
                <div className="flex flex-col pt-4">
                        <div className="text-sm text-muted-foreground">
                                {/* Subtotal */}
                                <div className="flex items-center justify-between border-b pb-1 mb-3">
                                        <p>Subtotal</p>
                                        <p className="text-base text-foreground">{formatPrice(order.total)}</p>
                                </div>

                                {/* Taxes */}
                                <div className="flex items-center justify-between border-b pb-1 mb-3">
                                        <p>Taxes</p>
                                        <p className="text-base text-foreground">{formatPrice(2)}</p>
                                </div>

                                {/* Shipping */}
                                <div className="flex items-center justify-between border-b pb-1 mb-3">
                                        <p>Status</p>
                                        <p className="text-base text-foreground">
                                                <StatusBadge status={order.status} />
                                        </p>
                                </div>

                                {/* Total */}
                                <div className="flex items-center justify-between border-b pb-1 mb-3 font-semibold text-lg">
                                        <p className="text-base text-foreground">Total</p>
                                        <p className="text-base text-foreground">{formatPrice(order.total)}</p>
                                </div>
                        </div>
                </div>
        );
};

export default OrderSummary;
