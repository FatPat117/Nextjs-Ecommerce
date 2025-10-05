// app/admin/products/[productId]/edit/page.tsx
import { getCategories, getProductById } from "@/lib/actions/products";
import { ProductForm } from "../../new/ProductForm";

export default async function EditProductPage({ params }: { params: { productId: string } }) {
        const [product, categories] = await Promise.all([getProductById(params.productId), getCategories()]);

        if (!product) {
                return <p>Product not found.</p>;
        }

        return (
                <div>
                        {/* Tái sử dụng ProductForm và truyền dữ liệu sản phẩm vào */}
                        <ProductForm categories={categories} product={product} />
                </div>
        );
}
