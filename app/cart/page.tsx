import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { getCart } from "@/lib/action";
import Link from "next/link";

const CartPage = async () => {
        const cart = await getCart();

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
                                <div className="flex flex-col ">
                                        {cart.items.map((item) => (
                                                <CartItem key={item.id} cartItem={item} />
                                        ))}
                                </div>
                        )}
                </main>
        );
};

export default CartPage;
