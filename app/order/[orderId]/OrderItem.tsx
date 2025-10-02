import { Prisma } from "@/app/generated/prisma";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

interface OrderItemProps {
        orderItem: Prisma.OrderItemGetPayload<{
                include: { product: true };
        }>;
}

const OrderItem = ({ orderItem }: OrderItemProps) => {
        return (
                <li className="border-b border-muted flex py-4 justify-between">
                        <div className="flex items-start space-x-4">
                                <div className="overflow-hidden rounded-md border border-muted w-16 h-16">
                                        <Image
                                                className="h-full w-full object-cover"
                                                width={128}
                                                height={128}
                                                src={orderItem.product.image || ""}
                                                alt={orderItem.product.name}
                                        />
                                </div>
                                {/* Product infp */}
                                <div className="flex flex-col">
                                        <div className="text-lg font-medium">{orderItem.product.name}</div>
                                </div>
                        </div>

                        {/* Action */}
                        <div className="flex flex-col justify-between items-end gap-2">
                                <p className="font-medium">{formatPrice(orderItem.product.price)}</p>

                                <div className="flex items-center border border-muted rounded-full">
                                        <p className="p-1 text-center">Quantity:{orderItem.quantity}</p>
                                </div>
                        </div>
                </li>
        );
};

export default OrderItem;
