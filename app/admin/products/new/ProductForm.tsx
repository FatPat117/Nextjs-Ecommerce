"use client";

import { Category } from "@/app/generated/prisma";
import { addProduct, ProductWithCategory, updateProduct } from "@/lib/actions/products";
import Image from "next/image";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
type ProductFormState = {
        message: string | null;
        success: boolean;
        errors: Partial<Record<"name" | "price" | "inventory" | "categoryId" | "description" | "image", string[]>>;
};

export function ProductForm({ categories, product }: { categories: Category[]; product?: ProductWithCategory }) {
        // Quyết định sẽ gọi action nào: nếu có `product` thì gọi `update`, không thì gọi `add`
        const actionToCall = product ? updateProduct.bind(null, product.id) : addProduct;
        const initialState: ProductFormState = { errors: {}, message: null as string | null, success: false };
        const [state, dispatch] = useActionState<ProductFormState, FormData>(actionToCall, initialState);

        const formRef = useRef<HTMLFormElement>(null);

        useEffect(() => {
                if (state.message && !state.success) {
                        toast.error(state.message);
                }
                if (state.success) {
                        toast.success(state.message);

                        if (!product) {
                                formRef.current?.reset();
                        }
                }
        }, [state, product]);

        return (
                <form
                        ref={formRef}
                        action={dispatch}
                        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 p-8 space-y-8"
                >
                        {/* Header */}
                        <div className="border-b pb-4 mb-6">
                                <h1 className="text-2xl font-semibold text-gray-800">🛍️ Add New Product</h1>
                                <p className="text-sm text-gray-500 mt-1">
                                        {product
                                                ? "Cập nhật thông tin sản phẩm."
                                                : "Điền thông tin sản phẩm để thêm vào cửa hàng của bạn."}
                                </p>
                        </div>

                        {/* Grid layout for inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Product Name */}
                                <InputField
                                        label="Product Name"
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        error={state.errors.name || []}
                                        defaultValue={product?.name || ""}
                                />

                                {/* Price */}
                                <InputField
                                        label="Price"
                                        id="price"
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        required
                                        error={state.errors?.price || []}
                                        defaultValue={product?.price}
                                />

                                {/* Inventory */}
                                <InputField
                                        label="Inventory"
                                        id="inventory"
                                        name="inventory"
                                        type="number"
                                        required
                                        error={state.errors?.inventory || []}
                                        defaultValue={product?.inventory}
                                />

                                {/* Image URL */}
                                <InputField
                                        label="Image URL"
                                        id="image"
                                        name="image"
                                        type="file"
                                        placeholder="https://example.com/product.jpg"
                                        error={state.errors?.image}
                                />
                                {product?.image && (
                                        <div className="mt-2">
                                                <p className="text-sm text-gray-500 mb-1">Current image:</p>
                                                <Image
                                                        width={500}
                                                        height={500}
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-32 h-32 object-cover rounded-lg border"
                                                />
                                        </div>
                                )}
                        </div>

                        {/* Description */}
                        <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                </label>
                                <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        placeholder="Mô tả chi tiết sản phẩm..."
                                        className="block w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 transition text-sm p-3"
                                        defaultValue={product?.description || ""}
                                />
                        </div>

                        {/* Category */}
                        <div>
                                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                                        Category
                                </label>
                                <select
                                        id="categoryId"
                                        name="categoryId"
                                        className="block w-full rounded-xl border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:ring focus:ring-blue-100 transition"
                                        required
                                        defaultValue={product?.categoryId || ""}
                                >
                                        {product ? (
                                                <option value={product.categoryId}>{product?.category?.name}</option>
                                        ) : (
                                                <option value="">Select a category</option>
                                        )}
                                        {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                        {category.name}
                                                </option>
                                        ))}
                                </select>
                                {state.errors?.categoryId && (
                                        <p className="mt-1 text-sm text-red-600">
                                                {state.errors.categoryId.join(", ")}
                                        </p>
                                )}
                        </div>

                        {/* Submit */}
                        <div className="pt-4">
                                <SubmitButton />
                        </div>
                </form>
        );
}
