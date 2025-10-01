import { Button } from "@/components/ui/button";
import { getCart } from "@/lib/action";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

const CartSummary = async () => {
        const cart = await getCart();
        if (!cart) {
                return null;
        }
        const subTotal = cart.subTotal;
        const taxes = 0;
        const shipping = 0;
        const total = subTotal + taxes + shipping;
        return (
                <div className="flex flex-col pt-4">
                        <div className="text-sm text-muted-foreground">
                                {/* Subtotal */}
                                <div className="flex items-center justify-between border-b pb-1 mb-3">
                                        <p>Subtotal</p>
                                        <p className="text-base text-foreground">{formatPrice(subTotal)}</p>
                                </div>

                                {/* Taxes */}
                                <div className="flex items-center justify-between border-b pb-1 mb-3">
                                        <p>Taxes</p>
                                        <p className="text-base text-foreground">{formatPrice(taxes)}</p>
                                </div>

                                {/* Shipping */}
                                <div className="flex items-center justify-between border-b pb-1 mb-3">
                                        <p>Shipping</p>
                                        <p className="text-base text-foreground">{formatPrice(shipping)}</p>
                                </div>

                                {/* Total */}
                                <div className="flex items-center justify-between border-b pb-1 mb-3 font-semibold text-lg">
                                        <p className="text-base text-foreground">Total</p>
                                        <p className="text-base text-foreground">{formatPrice(total)}</p>
                                </div>
                        </div>

                        {/* Proceed to checkout */}
                        <Button size={"lg"} asChild className="mt-4 w-full">
                                <Link href="/checkout" className="w-full">
                                        Proceed to checkout
                                </Link>
                        </Button>
                </div>
        );
};

export default CartSummary;
