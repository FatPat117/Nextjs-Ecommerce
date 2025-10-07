// lib/actions/product.ts
"use server";

import { Prisma } from "@/app/generated/prisma";
import db from "@/lib/db";
import { UploadApiResponse } from "cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import cloudinary from "../cloudinary";
export type ProductWithCategory = Prisma.ProductGetPayload<{ include: { category: true } }>;

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
 
export async function addProduct(prevState: any, formData: FormData) {
        const imageFile = formData.get("image") as File;
        const { ...fields } = Object.fromEntries(formData.entries());

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
                 
        } catch (error: any) {
                console.error("Database Error:", error);
                return { message: error.message || "Failed to create product.", success: false, errors: {} };
        }

        revalidatePath("/admin/products");
        redirect("/admin/products");
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
                console.error("Get Categories Error:", error);
                return [];
        }
}

// =================Update Product ===================
const UpdateProductSchema = z.object({
        name: z.string().min(1, "Name is required").optional(),
        description: z.string().optional(),
        price: z.coerce.number().min(0, "Price must be a positive number").optional(),
        inventory: z.coerce.number().int("Inventory must be a whole number").optional(),
        categoryId: z.string().min(1, "Category is required").optional(),
});

// Action để TÌM MỘT SẢN PHẨM theo ID
export async function getProductById(productId: string): Promise<ProductWithCategory | null> {
        try {
                const product = await db.product.findUnique({
                        where: { id: productId },
                        include: {
                                category: true,
                        },
                });
                return product;
        } catch (error) {
                console.error("Database Error:", error);
                return null;
        }
}

// Action để CẬP NHẬT sản phẩm
 
export async function updateProduct(productId: string, prevState: any, formData: FormData) {
        const imageFile = formData.get("image") as File;
        const { ...fields } = Object.fromEntries(formData.entries());
        const validatedFields = UpdateProductSchema.safeParse(fields);

        if (!validatedFields.success) {
                return {
                        message: "Please review the form and correct any errors.",
                        errors: validatedFields.error.flatten().fieldErrors,
                        success: false,
                };
        }

        let imageUrl: string | undefined = undefined;

        // Nếu người dùng upload ảnh mới thì mới xử lý
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
                const dataToUpdate = {
                        ...validatedFields.data,
                        slug: validatedFields.data.name
                                ? validatedFields.data.name.toLowerCase().replace(/\s+/g, "-")
                                : undefined,
                        image: imageUrl, // Chỉ cập nhật ảnh nếu có ảnh mới
                };

                await db.product.update({
                        where: { id: productId },
                        data: dataToUpdate,
                });
        } catch (error) {
                console.error("Database Error: Failed to Update Product:", error);
                return { message: "Database Error: Failed to Update Product.", errors: {}, success: false };
        }

        revalidatePath("/admin/products");
        redirect("/admin/products");
}
