import bcrypt from "bcryptjs";
import NextAuth, { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import db from "./db";
import { signInSchema } from "./schemas";

declare module "next-auth" {
        interface User {
                id: string;
                role: string;
                name: string;
                email: string;
        }
}

declare module "next-auth/jwt" {
        interface JWT {
                user: { id: string; role: string; name: string; email: string };
                refreshedAt?: string;
        }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
        providers: [
                Credentials({
                        name: "Credentials",
                        credentials: {
                                email: { label: "Email", type: "email" },
                                password: { label: "Password", type: "password" },
                        },
                        async authorize(credentials): Promise<User | null> {
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

                                return {
                                        id: user.id,
                                        email: user.email,
                                        name: user.name || "",
                                        role: user.role,
                                };
                        },
                }),
        ],
        callbacks: {
                async jwt({ token, user }: { token: JWT; user: User }) {
                        if (user) {
                                token.id = user.id;
                                token.role = user.role;
                                token.name = user.name;
                                token.email = user.email;
                        }
                        return token;
                },
                async session({ session, token }: { session: Session; token: JWT }) {
                        if (session.user) {
                                session.user.id = token.id;
                                session.user.role = token.role;
                                session.user.name = token.name;
                                session.user.email = token.email;
                        }

                        return session;
                },
        },
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
