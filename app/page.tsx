import { mockProducts } from "@/lib/mock";

const HomePage = () => {
        return (
                <main className="container mx-auto p-4">
                        <h1 className="text-3xl font-bold mb-6">Home</h1>
                        <p>Showing {mockProducts.length} products</p>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <p>Products Here </p>
                        </div>
                </main>
        );
};

export default HomePage;
