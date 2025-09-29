import BreadcrumbsSkeleton from "@/components/BreadcrumbsSkeleton";
import ProductsSkeleton from "./ProductsSkeleton";

const Loading = () => {
        return (
                <main className="container mx-auto py-4">
                        <BreadcrumbsSkeleton />
                        <ProductsSkeleton />
                </main>
        );
};

export default Loading;
