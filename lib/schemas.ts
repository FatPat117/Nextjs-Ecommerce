import { z } from "zod";

export const signInSchema = z.object({
        email: z.string().email({
                message: "Please enter a valid email address",
        }),
        password: z.string().min(1, {
                message: "Please enter a password",
        }),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
        email: z.string().email({
                message: "Please enter a valid email address",
        }),
        password: z.string().min(8, {
                message: "Password must be at least 8 characters long",
        }),
});
