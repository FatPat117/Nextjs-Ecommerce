import { getProducts, GetProductsParams } from "@/lib/action";
import { ProductsList } from "./ProductList";

interface ProductListServerWrapperProps {
        params: GetProductsParams;
}

const ProductListServerWrapper = async ({ params }: ProductListServerWrapperProps) => {
        const products = await getProducts(params);

        return <ProductsList products={products} />;
};

export default ProductListServerWrapper;
