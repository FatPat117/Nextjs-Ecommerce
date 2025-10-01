import { CartItemWithProduct } from "@/lib/action";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

interface CartItemProps {
        cartItem: CartItemWithProduct;
}

const CartItem = ({ cartItem }: CartItemProps) => {
        return (
                <li className="border-b border-muted flex py-4 justify-between">
                        <div className="flex items-start space-x-4">
                                <div className="overflow-hidden rounded-md border border-muted w-16 h-16">
                                        <Image
                                                className="h-full w-full object-cover"
                                                width={128}
                                                height={128}
                                                src={cartItem.product.image || ""}
                                                alt={cartItem.product.name}
                                        />
                                </div>
                                {/* Product infp */}
                                <div className="flex flex-col">
                                        <div className="text-lg font-medium">{cartItem.product.name}</div>
                                </div>
                        </div>

                        {/* Action */}
                        <div className="flex flex-col justify-between items-end gap-2">
                                <p className="font-medium">{formatPrice(cartItem.product.price)}</p>

                                <div className="flex items-center border border-muted rounded-full">
                                        <Button variant={"ghost"} className="cursor-pointer rounded-l-full">
                                                <Minus className="h-4 w-4" />
                                        </Button>
                                        <p className="w-6 text-center">{cartItem.quantity}</p>
                                        <Button variant={"ghost"} className="cursor-pointer rounded-r-full">
                                                <Plus className="h-4 w-4" />
                                        </Button>
                                </div>
                        </div>
                </li>
        );
};

export default CartItem;
