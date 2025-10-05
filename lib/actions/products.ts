// lib/actions/product.ts
"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { Prisma } from "@/app/generated/prisma";

type ProductType = Prisma.ProductGetPayload<{
        include: {
                category: true;
        };
}>;

// Zod schema để xác thực dữ liệu form
const ProductSchema = z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string().optional(),
        price: z.coerce.number().min(0, "Price must be a positive number"),
        inventory: z.coerce.number().int("Inventory must be a whole number"),
        image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
        categoryId: z.string().min(1, "Category is required"),
});

// Action để thêm sản phẩm
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addProduct(prevState: any, formData: FormData) {
        const validatedFields = ProductSchema.safeParse(Object.fromEntries(formData.entries()));

        if (!validatedFields.success) {
                return {
                        errors: validatedFields.error.flatten().fieldErrors,
                };
        }

        try {
                await db.product.create({
                        data: {
                                ...validatedFields.data,
                                // Tạo slug từ tên sản phẩm
                                slug: validatedFields.data.name.toLowerCase().replace(/\s+/g, "-"),
                        },
                });
        } catch (error) {
                console.error("Database Error:", error);
                return {
                        message: "Database Error: Failed to Create Product.",
                };
        }

        // Revalidate lại trang danh sách sản phẩm để hiển thị sản phẩm mới
        revalidatePath("/admin/products");
        // Chuyển hướng về trang danh sách sản phẩm

        return { success: true, message: "Product added successfully!" };
}

export async function getProducts(): Promise<ProductType[]> {
        try {
                const products = await db.product.findMany({
                        include: {
                                category: true,
                        },
                        orderBy: {
                                createdAt: "desc",
                        },
                });
                return products;
        } catch (error) {
                console.error(error);
                return [];
        }
}

// Action để lấy danh sách danh mục (cần cho form)
export async function getCategories() {
        try {
                const categories = await db.category.findMany();
                return categories;
        } catch (error) {
                return [];
        }
}
