import Breadcrumbs from "@/components/Breadcrumbs";
import ProductsListServerWrapper from "@/components/ProductListServerWrapper";
import { Suspense } from "react";
import ProductsSkeleton from "../ProductsSkeleton";

type SearchParamsProps = {
        searchParams: { query?: string | null; sort?: string | null; page?: number; pageSize?: number };
};

const SearchPage = async ({ searchParams }: SearchParamsProps) => {
        let { query, sort } = searchParams;

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
                                <ProductsListServerWrapper params={{ query, sort }} />
                        </Suspense>
                </main>
        );
};

export default SearchPage;
