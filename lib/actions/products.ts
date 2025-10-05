// lib/actions/product.ts
"use server";

import { Prisma } from "@/app/generated/prisma";
import db from "@/lib/db";
import { UploadApiResponse } from "cloudinary";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import cloudinary from "../cloudinary";

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
        const imageFile = formData.get("image") as File;
        const { image, ...fields } = Object.fromEntries(formData.entries());

        const validatedFields = ProductSchema.safeParse(fields);
        if (!validatedFields.success) {
                return {
                        message: "Please review the form and correct any errors.",
                        errors: validatedFields.error.flatten().fieldErrors,
                        success: false,
                };
        }

        let imageUrl = "";

        if (imageFile && imageFile.size > 0) {
                try {
                        const imageBuffer = await imageFile.arrayBuffer();
                        const buffer = new Uint8Array(imageBuffer);

                        const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
                                cloudinary.uploader
                                        .upload_stream(
                                                {
                                                        folder: "products",
                                                        tags: ["nextjs-ecommerce-products"],
                                                },
                                                (error, result) => {
                                                        if (error || !result) return reject(error);
                                                        resolve(result);
                                                }
                                        )
                                        .end(buffer);
                        });

                        imageUrl = uploadResult.secure_url;
                } catch (error) {
                        console.error("Failed to upload image:", error);
                        return { message: "Failed to upload image.", success: false, errors: {} };
                }
        }

        try {
                await db.product.create({
                        data: {
                                ...validatedFields.data,
                                image: imageUrl || null,
                                slug: validatedFields.data.name
                                        .toLowerCase()
                                        .trim()
                                        .replace(/[^\w\s-]/g, "")
                                        .replace(/\s+/g, "-"),
                        },
                });
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
                console.error("Database Error:", error);
                return { message: error.message || "Failed to create product.", success: false, errors: {} };
        }

        revalidatePath("/admin/products");
        return { success: true, message: "Product added successfully!", errors: {} };
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
