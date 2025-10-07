"use client";
import { Product } from "@/app/generated/prisma";
import { addToCart } from "@/lib/action";
import { useCart } from "@/lib/useCart";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const AddToCartBtn = ({ product }: { product: Product }) => {
        const [isAdding, setIsAdding] = useState(false);
        const { revalidateCart } = useCart();
        const handleAddToCart = async () => {
                try {
                        setIsAdding(true);
                        await addToCart(product.id);
                        revalidateCart();
                } catch (error) {
                        console.error("Error adding to cart", error);
                } finally {
                        setIsAdding(false);
                }
        };

        return (
                <Button
                        disabled={product.inventory === 0 || isAdding}
                        className="w-full cursor-pointer"
                        onClick={handleAddToCart}
                >
                        <ShoppingCart className="mr-2 w-4 h-4" />
                        {product.inventory > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>
        );
};

export default AddToCartBtn;
