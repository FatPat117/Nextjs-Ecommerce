"use client";
import { Product } from "@/app/generated/prisma";
import ProductCard from "@/app/products/ProductCard";

type ProductsListProps = {
        products: Product[];
};

export function ProductsList({ products }: ProductsListProps) {
        if (products.length == 0) {
                return (
                        <div className="text-center text-muted-foreground py-10">
                                <h1 className="text-2xl font-bold">No products found</h1>
                                <p className="text-sm">Try searching for something else or check your spelling.</p>
                        </div>
                );
        }

        return (
                <>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                ))}
                        </div>
                </>
        );
}
