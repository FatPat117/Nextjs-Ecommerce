// app/admin/products/new/page.tsx
import { getCategories } from "@/lib/actions/products";
import { ProductForm } from "./ProductForm";

export default async function NewProductPage() {
        // Lấy danh sách categories để truyền vào form (cho dropdown)
        const categories = await getCategories();

        return (
                <div>
                        <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
                        <ProductForm categories={categories} />
                </div>
        );
}
