import Breadcrumbs from "@/components/Breadcrumbs";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "../../products/ProductCard";
import ProductsSkeleton from "../../ProductsSkeleton";

type ParamsProps = {
        params: Promise<{ slug: string }>;
};

async function Products({ slug = "" }: { slug: string }) {
        const products = await db.product.findMany({
                where: {
                        category: {
                                slug: slug,
                        },
                },
                take: 18,
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

const CategoryPage = async ({ params }: ParamsProps) => {
        const { slug } = await params;
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
                <main className="container mx-auto py-4">
                        <Breadcrumbs items={breadcrumbs} />
                        <Suspense key={slug} fallback={<ProductsSkeleton />}>
                                <Products slug={slug} />
                        </Suspense>
                </main>
        );
};

export default CategoryPage;
