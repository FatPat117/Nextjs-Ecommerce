import Breadcrumbs from "@/components/Breadcrumbs";
import db from "@/lib/db";
import { Suspense } from "react";
import ProductCard from "../products/ProductCard";
import ProductsSkeleton from "../ProductsSkeleton";

type SearchParamsProps = {
        searchParams: Promise<{ query?: string | null; sort?: string | null }>;
};

async function Products({ query = "", sort = null }: { query: string; sort: string | null }) {
        let orderBy: Record<string, "asc" | "desc" | undefined> = {};

        if (sort == "price-asc") {
                orderBy = { price: "asc" };
        } else if (sort == "price-desc") {
                orderBy = { price: "desc" };
        }

        const products = await db.product.findMany({
                where: {
                        OR: [
                                { name: { contains: query, mode: "insensitive" } },
                                { description: { contains: query, mode: "insensitive" } },
                        ],
                },
                take: 18,
                ...(orderBy && { orderBy }),
        });

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

const SearchPage = async ({ searchParams }: SearchParamsProps) => {
        let { query, sort } = await searchParams;
        sort = String(sort);
        query = query?.trim() ?? "";

        const breadcrumbs = [
                { label: "Products", href: "/products" },
                {
                        label: `Result for ${query}`,
                        href: `/search?query=${encodeURIComponent(query)}`,
                },
        ];

        return (
                <main className="container mx-auto py-4">
                        <Breadcrumbs items={breadcrumbs} />
                        <Suspense key={`${query}-${sort}`} fallback={<ProductsSkeleton />}>
                                <Products query={query} sort={sort} />
                        </Suspense>
                </main>
        );
};

export default SearchPage;
