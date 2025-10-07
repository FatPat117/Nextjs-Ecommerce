// lib/auth.config.ts

import type { NextAuthConfig } from "next-auth";

// Mở rộng kiểu dữ liệu của User và Session trong auth object
// để có thể truy cập `role` và `id`

export const authConfig = {
        providers: [],

        // Trang đăng nhập tùy chỉnh
        pages: {
                signIn: "/auth/signin",
        },

        callbacks: {
                /**
                 * Callback này được gọi BẤT CỨ KHI NÀO một request được thực thi
                 * mà có sử dụng middleware. Nó quyết định người dùng có được
                 * phép truy cập trang hay không.
                 */
                authorized({ auth, request: { nextUrl } }) {
                        const user = auth?.user;
                        const isLoggedIn = !!user;

                        const isOnAdminPage = nextUrl.pathname.startsWith("/admin");
                        const isOnAccountPage = nextUrl.pathname.startsWith("/account");

                        // Logic cho trang admin
                        if (isOnAdminPage) {
                                if (isLoggedIn && user.role === "admin") {
                                        return true; // Cho phép nếu đã đăng nhập và là admin
                                }
                                return false; // Chặn và redirect về trang đăng nhập
                        }

                        // Logic cho các trang cần đăng nhập (ví dụ: /account)
                        else if (isOnAccountPage) {
                                if (isLoggedIn) {
                                        return true; // Cho phép nếu đã đăng nhập
                                }
                                return false; // Chặn và redirect
                        }

                        // Mặc định cho phép truy cập tất cả các trang khác
                        return true;
                },

                /**
                 * Callback này được gọi sau khi đăng nhập thành công.
                 * Dữ liệu trả về từ `authorize` sẽ được truyền vào `user` ở đây.
                 * Chúng ta sẽ thêm `id` và `role` vào token.
                 */
                jwt({ token, user }) {
                        if (user) {
                                token.id = user.id;
                                token.role = user.role;
                        }
                        return token;
                },

                /**
                 * Callback này được gọi mỗi khi một session được truy cập.
                 * Chúng ta sẽ lấy `id` và `role` từ token và gán vào session.
                 */
                session({ session, token }) {
                        if (session.user) {
                                session.user.id = token.id as string;
                                session.user.role = token.role as string;
                        }
                        return session;
                },
        },
} satisfies NextAuthConfig;
