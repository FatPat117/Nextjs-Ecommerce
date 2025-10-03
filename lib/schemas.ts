import { z } from "zod";

export const signInSchema = z.object({
        email: z.string().email({
                message: "Please enter a valid email address",
        }),
        password: z.string().min(1, {
                message: "Please enter a password",
        }),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;

export const signUpSchema = z
        .object({
                name: z.string().min(2, {
                        message: "Name must be at least 2 characters long.",
                }),
                email: z.string().email({
                        message: "Please enter a valid email address.",
                }),
                password: z.string().min(8, {
                        message: "Password must be at least 8 characters long.",
                }),
                confirmPassword: z.string().min(8, {
                        message: "Password must be at least 8 characters long.",
                }),
        })
        .refine((data) => data.password === data.confirmPassword, {
                message: "Passwords do not match.",
                path: ["confirmPassword"],
        });

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
