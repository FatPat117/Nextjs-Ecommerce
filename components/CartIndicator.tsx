import { getCart } from "@/lib/action";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const CartIndicator = async () => {
        const cart = await getCart();
        const cartSize = cart?.size ?? 0;

        return (
                <Button variant={"ghost"} size={"icon"} asChild className="relative">
                        <Link href="/cart">
                                <ShoppingCart className="h-5 w-5" />
                                {cartSize > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-center">
                                                {cartSize}
                                        </span>
                                )}
                        </Link>
                </Button>
        );
};

export default CartIndicator;
