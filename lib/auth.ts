// lib/auth.ts

import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authConfig } from "./auth.config"; // <-- Import cấu hình an toàn
import db from "./db";
import { signInSchema } from "./schemas";

export const { handlers, signIn, signOut, auth } = NextAuth({
        ...authConfig,
        providers: [
                // Thêm provider Credentials yêu cầu môi trường Node.js ở đây
                Credentials({
                        async authorize(credentials) {
                                const parsedCredentials = signInSchema.safeParse(credentials);

                                if (parsedCredentials.success) {
                                        const { email, password } = parsedCredentials.data;

                                        const user = await db.user.findUnique({ where: { email } });
                                        if (!user || !user.password) return null;

                                        const passwordsMatch = await bcrypt.compare(password, user.password);
                                        if (passwordsMatch) {
                                                // Trả về đối tượng user đầy đủ, bao gồm cả role
                                                return {
                                                        id: user.id,
                                                        email: user.email,
                                                        name: user.name,
                                                        role: user.role,
                                                };
                                        }
                                }

                                console.log("Invalid credentials");
                                return null;
                        },
                }),
        ],
});

export async function hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
}
