// types/next-auth.d.ts

import type { DefaultSession } from "next-auth";
import "next-auth/jwt";

/**
 * Mở rộng type của JWT để chứa thêm role và id.
 */
declare module "next-auth/jwt" {
        interface JWT {
                role?: string;
                id?: string;
        }
}

/**
 * Mở rộng type của Session và User để TypeScript nhận diện được
 * các thuộc tính role và id mà chúng ta đã thêm vào.
 */
declare module "next-auth" {
        // Mở rộng interface Session
        interface Session {
                user: {
                        role?: string;
                        id?: string;
                } & DefaultSession["user"]; // Giữ lại các thuộc tính mặc định của user
        }

        // Mở rộng interface User
        interface User {
                role?: string;
        }
}
