import db from "@/lib/db";
import ProductCard from "./products/ProductCard";
const HomePage = async () => {
        const products = await db.product.findMany();
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
                </main>
        );
};

export default HomePage;
