import {
        Pagination,
        PaginationContent,
        PaginationItem,
        PaginationLink,
        PaginationNext,
        PaginationPrevious,
} from "@/components/ui/pagination";
import db from "@/lib/db";
import ProductCard from "./products/ProductCard";
const HomePage = async ({ searchParams }: { searchParams: { page: string } }) => {
        const page = Number(searchParams.page) || 1;
        const pageSize = 3;
        const skip = (page - 1) * pageSize;
        const [products, totalProducts] = await Promise.all([
                db.product.findMany({
                        take: pageSize,
                        skip,
                }),
                db.product.count(),
        ]);

        const totalPages = Math.ceil(totalProducts / pageSize);

        await new Promise((resolve) => setTimeout(resolve, 5000));
        return (
                <main className="container mx-auto p-4">
                        <h1 className="text-3xl font-bold mb-6">Home</h1>
                        <p>Showing {products.length} products</p>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                ))}
                        </div>

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
