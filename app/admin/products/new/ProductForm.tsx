"use client";

import { Category } from "@/app/generated/prisma";
import { addProduct } from "@/lib/actions/products";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";

export function ProductForm({ categories }: { categories: Category[] }) {
        const initialState = { errors: {}, message: undefined };
        const [state, dispatch] = useFormState(addProduct, initialState);

        return (
                <form
                        action={dispatch}
                        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 p-8 space-y-8"
                >
                        {/* Header */}
                        <div className="border-b pb-4 mb-6">
                                <h1 className="text-2xl font-semibold text-gray-800">🛍️ Add New Product</h1>
                                <p className="text-sm text-gray-500 mt-1">
                                        Điền thông tin sản phẩm để thêm vào cửa hàng của bạn.
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
                                        error={state.errors?.name}
                                />

                                {/* Price */}
                                <InputField
                                        label="Price"
                                        id="price"
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        required
                                        error={state.errors?.price}
                                />

                                {/* Inventory */}
                                <InputField
                                        label="Inventory"
                                        id="inventory"
                                        name="inventory"
                                        type="number"
                                        required
                                        error={state.errors?.inventory}
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
                                >
                                        <option value="">Select a category</option>
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

function InputField({
        label,
        id,
        name,
        type,
        required,
        step,
        placeholder,
        error,
}: {
        label: string;
        id: string;
        name: string;
        type: string;
        required?: boolean;
        step?: string;
        placeholder?: string;
        error?: string[];
}) {
        return (
                <div>
                        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                                {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                                type={type}
                                id={id}
                                name={name}
                                step={step}
                                required={required}
                                placeholder={placeholder}
                                className="block w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 transition text-sm p-2.5"
                        />
                        {error && <p className="mt-1 text-sm text-red-600">{error.join(", ")}</p>}
                </div>
        );
}
