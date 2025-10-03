"use server";

import { hashPassword } from "../auth";
import db from "../db";
import { signUpSchema, SignUpSchemaType } from "../schemas";

export async function RegisterUser(user: SignUpSchemaType) {
        const parseData = await signUpSchema.safeParse(user);
        if (!parseData.success) {
                return {
                        success: false,
                        error: "Invalid data provided",
                        invalidFields: parseData.error.flatten().fieldErrors,
                };
        }
        const { name, email, password } = parseData.data;
        try {
                const existedUser = await db.user.findUnique({
                        where: {
                                email: email,
                        },
                });
                if (existedUser) {
                        return { success: false, error: "User already exists" };
                }
                const hashedPassword = await hashPassword(password);
                const newUser = await db.user.create({
                        data: {
                                name: name,
                                email: email,
                                password: hashedPassword,
                                role: "user",
                        },
                });

                const userWithoutPassword = {
                        id: newUser.id,
                        name: newUser.name,
                        email: newUser.email,
                        role: newUser.role,
                };
                return {
                        success: true,
                        user: userWithoutPassword,
                };
        } catch (error) {
                console.error("RegisterUser error", error);
                return {
                        success: false,
                        error: "Could not create account. Please try again later.",
                };
        }
}
