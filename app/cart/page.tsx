import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import { Button } from "@/components/ui/button";
import { getCart } from "@/lib/action";
import { auth } from "@/lib/auth";
import { createOrder, ProcessCheckoutResponse } from "@/lib/orders";
import Link from "next/link";
import { redirect } from "next/navigation";

const CartPage = async () => {
        const cart = await getCart();
        const session = await auth();
        const userId = session?.user?.id;
        const handleCheckout = async () => {
                "use server";
                let result: ProcessCheckoutResponse | undefined | null = null;
                if (!userId) {
                        redirect("/auth/signin");
                }
                try {
                        result = await createOrder();
                } catch (error) {
                        console.error("checkout error", error);
                }
                console.log(result);
                if (result) {
                        redirect(result.sessionUrl);
                }
        };

        return (
                <main className="container mx-auto py-4">
                        <h1>Cart</h1>
                        {!cart || cart.items.length === 0 ? (
                                <div className="text-center">
                                        <h2 className="text-2xl">Your cart is empty</h2>
                                        <p className="text-gray-500">Add some items to your cart</p>
                                        <Button asChild>
                                                <Link href="/">Continue shopping</Link>
                                        </Button>
                                </div>
                        ) : (
                                <>
                                        <div className="flex flex-col ">
                                                {cart.items.map((item) => (
                                                        <CartItem key={item.id} cartItem={item} />
                                                ))}
                                        </div>

                                        <CartSummary />

                                        {/* Proceed to checkout */}
                                        <form action={handleCheckout}>
                                                <Button
                                                        size={"lg"}
                                                        className="mt-4 w-full cursor-pointer"
                                                        type="submit"
                                                >
                                                        Proceed to checkout
                                                </Button>
                                        </form>
                                </>
                        )}
                </main>
        );
};

export default CartPage;
