// app/admin/products/page.tsx
import { getProducts } from "@/lib/actions/products";
import Link from "next/link";

export default async function ProductsPage() {
        const products = await getProducts();

        return (
                <div>
                        <div className="flex justify-between items-center mb-6">
                                <h1 className="text-3xl font-bold">Manage Products</h1>
                                <Link
                                        href="/admin/products/new"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                        + Add New Product
                                </Link>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow">
                                <table className="w-full">
                                        <thead>
                                                <tr className="border-b">
                                                        <th className="text-left p-3">Name</th>
                                                        <th className="text-left p-3">Price</th>
                                                        <th className="text-left p-3">Inventory</th>
                                                        <th className="text-left p-3">Actions</th>
                                                </tr>
                                        </thead>
                                        <tbody>
                                                {products.length > 0 ? (
                                                        products.map((product) => (
                                                                <tr
                                                                        key={product.id}
                                                                        className="border-b hover:bg-gray-50"
                                                                >
                                                                        <td className="p-3">{product.name}</td>
                                                                        <td className="p-3">
                                                                                ${product.price.toFixed(2)}
                                                                        </td>
                                                                        <td className="p-3">{product.inventory}</td>
                                                                        <td className="p-3">
                                                                                {/* Chúng ta sẽ thêm nút Edit/Delete ở đây sau */}
                                                                                <button className="text-blue-500 hover:underline">
                                                                                        Edit
                                                                                </button>
                                                                        </td>
                                                                </tr>
                                                        ))
                                                ) : (
                                                        <tr>
                                                                <td
                                                                        colSpan={4}
                                                                        className="p-3 text-center text-gray-500"
                                                                >
                                                                        No products found.
                                                                </td>
                                                        </tr>
                                                )}
                                        </tbody>
                                </table>
                        </div>
                </div>
        );
}
