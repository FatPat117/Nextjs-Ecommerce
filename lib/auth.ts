import bcrypt from "bcryptjs";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
        providers: [],
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
