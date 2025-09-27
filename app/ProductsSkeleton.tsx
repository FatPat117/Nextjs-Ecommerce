import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductsSkeleton = () => {
        return (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((product) => (
                                <ProductCardSkeleton key={product} />
                        ))}
                </div>
        );
};

export default ProductsSkeleton;
