import Breadcrumbs from "@/components/Breadcrumbs";
import ProductsListServerWrapper from "@/components/ProductListServerWrapper";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductsSkeleton from "../../ProductsSkeleton";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
        const { slug } = await params;
        const category = await db.category.findUnique({
                where: { slug },
                select: {
                        name: true,
                        slug: true,
                },
        });

        if (!category) {
                return {};
        }

        return {
                title: category?.name,
                openGraph: {
                        title: category?.name,
                },
        };
}

type ParamsProps = {
        params: Promise<{ slug: string }>;
        searchParams?: Promise<{ sort?: string | null }>;
};

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
                        <Suspense key={`${slug}-${sort}`} fallback={<ProductsSkeleton />}>
                                <ProductsListServerWrapper params={{ slug, sort }} />
                        </Suspense>{" "}
                        *
                </div>
        );
};

export default CategoryPage;
