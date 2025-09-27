import ProductCardSkeleton from "./ProductCardSkeleton";

const Loading = () => {
        return (
                <main className="container mx-auto p-4">
                        <h1 className="text-3xl font-bold mb-6">Home</h1>
                        <p>Showing {6} products</p>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {[1, 2, 3, 4, 5, 6].map((product) => (
                                        <ProductCardSkeleton key={product} />
                                ))}
                        </div>
                </main>
        );
};

export default Loading;
