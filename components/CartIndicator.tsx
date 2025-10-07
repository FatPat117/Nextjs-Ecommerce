"use client";
import { useCart } from "@/lib/useCart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const CartIndicator = () => {
        const { itemCount, isLoading } = useCart();

        if (isLoading) {
                return (
                        <Button variant={"ghost"} size={"icon"} asChild className="relative">
                                <ShoppingCart className="h-5 w-5" />
                        </Button>
                );
        }

        return (
                <Button variant={"ghost"} size={"icon"} asChild className="relative">
                        <Link href="/cart">
                                <ShoppingCart className="h-5 w-5" />
                                {itemCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-center">
                                                {itemCount}
                                        </span>
                                )}
                        </Link>
                </Button>
        );
};

export default CartIndicator;
