import Breadcrumbs from "@/components/Breadcrumbs";
import db from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "../../products/ProductCard";
import ProductsSkeleton from "../../ProductsSkeleton";

type ParamsProps = {
        params: Promise<{ slug: string }>;
        searchParams?: Promise<{ sort?: string | null }>;
};

async function Products({ slug = "", sort }: { slug: string; sort?: string | null }) {
        let orderBy: Record<string, "asc" | "desc" | undefined> = {};

        if (sort == "price-asc") {
                orderBy = { price: "asc" };
        } else if (sort == "price-desc") {
                orderBy = { price: "desc" };
        }

        const products = await db.product.findMany({
                where: {
                        category: {
                                slug: slug,
                        },
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

const CategoryPage = async ({ params, searchParams }: ParamsProps) => {
        const { slug } = await params;
        const { sort } = (await searchParams) || {};

        const category = await db.category.findUnique({
                where: {
                        slug: slug,
                },
                select: {
                        name: true,
                        slug: true,
                },
        });

        if (!category) {
                return notFound();
        }

        const breadcrumbs = [
                { label: "Products", href: "/products" },
                { label: "Search", href: "/search" },
                {
                        label: `${category?.name}`,
                        href: `/search/${slug}`,
                },
        ];

        return (
                <div className="container mx-auto py-4">
                        <Breadcrumbs items={breadcrumbs} />

                        <div className="flex gap-3 text-sm mb-8">
                                <Link href={`/search/${slug}`}>Latest</Link>
                                <Link href={`/search/${slug}?sort=price-asc`}>Price: Low to High</Link>
                                <Link href={`/search/${slug}?sort=price-desc`}>Price: High to Low</Link>
                        </div>

                        <Suspense key={`${slug}-${sort}`} fallback={<ProductsSkeleton />}>
                                <Products slug={slug} sort={sort} />
                        </Suspense>
                </div>
        );
};

export default CategoryPage;
