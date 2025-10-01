"use client";
import { CartItemWithProduct, setProductQuantity } from "@/lib/action";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";

interface CartItemProps {
        cartItem: CartItemWithProduct;
}

const CartItem = ({ cartItem }: CartItemProps) => {
        const [isLoading, setIsLoading] = useState(false);

        const handleIncrement = async () => {
                try {
                        setIsLoading(true);
                        await setProductQuantity({ productId: cartItem.productId, quantity: cartItem.quantity + 1 });
                } catch (error) {
                        console.error("Failed to increment product quantity", error);
                } finally {
                        setIsLoading(false);
                }
        };

        const handleDecrement = async () => {
                try {
                        setIsLoading(true);
                        await setProductQuantity({ productId: cartItem.productId, quantity: cartItem.quantity - 1 });
                } catch (error) {
                        console.error("Failed to decrement product quantity", error);
                } finally {
                        setIsLoading(false);
                }
        };

        const handleRemove = async () => {
                try {
                        setIsLoading(true);
                        await setProductQuantity({ productId: cartItem.productId, quantity: 0 });
                } catch (error) {
                        console.error("Failed to remove product", error);
                } finally {
                        setIsLoading(false);
                }
        };
        return (
                <li className="border-b border-muted flex py-4 justify-between">
                        <div className="flex items-start space-x-4">
                                <div className="absolute z-10  -mt-2 ">
                                        <Button
                                                variant={"ghost"}
                                                size={"icon"}
                                                disabled={isLoading}
                                                className="w-7 h-7 rounded-full bg-muted text-muted-foreground cursor-pointer"
                                                onClick={handleRemove}
                                        >
                                                <X className="w-4 h-4" />
                                        </Button>
                                </div>

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
                                        <Button
                                                variant={"ghost"}
                                                disabled={isLoading}
                                                className="cursor-pointer rounded-l-full"
                                                onClick={handleDecrement}
                                        >
                                                <Minus className="h-4 w-4" />
                                        </Button>
                                        <p className="w-6 text-center">{cartItem.quantity}</p>
                                        <Button
                                                variant={"ghost"}
                                                disabled={isLoading}
                                                className="cursor-pointer rounded-r-full"
                                                onClick={handleIncrement}
                                        >
                                                <Plus className="h-4 w-4" />
                                        </Button>
                                </div>
                        </div>
                </li>
        );
};

export default CartItem;
