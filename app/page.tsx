import Breadcrumbs from "@/components/Breadcrumbs";
import {
        Pagination,
        PaginationContent,
        PaginationItem,
        PaginationLink,
        PaginationNext,
        PaginationPrevious,
} from "@/components/ui/pagination";
import db from "@/lib/db";
import { Suspense } from "react";
import ProductCard from "./products/ProductCard";
import ProductsSkeleton from "./ProductsSkeleton";
const pageSize = 3;

async function Products({ page }: { page: number }) {
        const skip = (page - 1) * pageSize;

        const products = await db.product.findMany({
                take: pageSize,
                skip,
        });

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

const HomePage = async ({ searchParams }: { searchParams: Promise<{ page: string }> }) => {
        const { page } = await searchParams;

        const pageNumber = Number(page) || 1;
        const totalProducts = await db.product.count();
        const totalPages = Math.ceil(totalProducts / pageSize);
        return (
                <main className="container mx-auto py-4">
                        <Breadcrumbs items={[{ label: "Products", href: "/products" }]} />

                        <Suspense key={page} fallback={<ProductsSkeleton />}>
                                <Products page={pageNumber} />
                        </Suspense>
                        {/* Pagination */}
                        <Pagination className="mt-8">
                                <PaginationContent>
                                        <PaginationItem>
                                                <PaginationPrevious href={`/?page=${pageNumber - 1}`} />
                                        </PaginationItem>
                                        {Array.from({ length: totalPages }).map((_, index) => (
                                                <PaginationItem key={index}>
                                                        <PaginationLink href={`/?page=${index + 1}`}>
                                                                {index + 1}
                                                        </PaginationLink>
                                                </PaginationItem>
                                        ))}
                                        <PaginationItem>
                                                <PaginationNext href={`/?page=${pageNumber + 1}`} />
                                        </PaginationItem>
                                </PaginationContent>
                        </Pagination>
                </main>
        );
};

export default HomePage;
