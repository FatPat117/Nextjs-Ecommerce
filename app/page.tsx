import Breadcrumbs from "@/components/Breadcrumbs";
import ProductListServerWrapper from "@/components/ProductListServerWrapper";
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
import ProductsSkeleton from "./ProductsSkeleton";
const pageSize = 3;

const HomePage = async ({ searchParams }: { searchParams: { page: string } }) => {
        const { page } = searchParams;

        const pageNumber = Number(page) || 1;
        const totalProducts = await db.product.count();
        const totalPages = Math.ceil(totalProducts / pageSize);

        return (
                <main className="container mx-auto py-4">
                        <Breadcrumbs items={[{ label: "Products", href: "/products" }]} />

                        <Suspense key={page} fallback={<ProductsSkeleton />}>
                                <ProductListServerWrapper params={{ page: pageNumber, pageSize }} />
                        </Suspense>
                        {/* Pagination */}
                        <Pagination className="mt-8">
                                <PaginationContent>
                                        <PaginationItem>
                                                <PaginationPrevious href={`/?page=${pageNumber - 1}`} />
                                        </PaginationItem>
                                        {Array.from({ length: totalPages }).map((_, index) => (
                                                <PaginationItem key={index}>
                                                        <PaginationLink
                                                                href={`/?page=${index + 1}`}
                                                                isActive={index + 1 === pageNumber}
                                                        >
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
