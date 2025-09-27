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
                        <p>Showing {products.length} products</p>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                ))}
                        </div>
                </>
        );
}

const HomePage = async ({ searchParams }: { searchParams: { page: string } }) => {
        const page = Number(searchParams.page) || 1;
        const totalProducts = await db.product.count();
        const totalPages = Math.ceil(totalProducts / pageSize);
        return (
                <main className="container mx-auto p-4">
                        <h1 className="text-3xl font-bold mb-6">Home</h1>

                        <Suspense key={page} fallback={<ProductsSkeleton />}>
                                <Products page={page} />
                        </Suspense>
                        {/* Pagination */}
                        <Pagination className="mt-8">
                                <PaginationContent>
                                        <PaginationItem>
                                                <PaginationPrevious href={`/?page=${page - 1}`} />
                                        </PaginationItem>
                                        {Array.from({ length: totalPages }).map((_, index) => (
                                                <PaginationItem key={index}>
                                                        <PaginationLink href={`/?page=${index + 1}`}>
                                                                {index + 1}
                                                        </PaginationLink>
                                                </PaginationItem>
                                        ))}
                                        <PaginationItem>
                                                <PaginationNext href={`/?page=${page + 1}`} />
                                        </PaginationItem>
                                </PaginationContent>
                        </Pagination>
                </main>
        );
};

export default HomePage;
