import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "./db";
import { signInSchema } from "./schemas";

export const { handlers, signIn, signOut, auth } = NextAuth({
        providers: [
                Credentials({
                        name: "Credentials",
                        credentials: {
                                email: { label: "Email", type: "email" },
                                password: { label: "Password", type: "password" },
                        },
                        async authorize(credentials) {
                                const parseCredentials = signInSchema.safeParse(credentials);

                                if (!parseCredentials.success) {
                                        console.log("Invalid credentials");
                                        return null;
                                }

                                const { email, password } = parseCredentials.data;

                                const user = await db.user.findUnique({
                                        where: { email },
                                });

                                if (!user) {
                                        console.log("User not found");
                                        return null;
                                }

                                const passwordsMatch = await verifyPassword(password, user.password);

                                if (!passwordsMatch) {
                                        console.log("Invalid password");
                                        return null;
                                }

                                return user;
                        },
                }),
        ],
        pages: {
                signIn: "/auth/signin",
        },
});

export async function hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
}
