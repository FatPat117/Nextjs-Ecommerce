// middleware.ts

import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

const { auth: middleware } = NextAuth(authConfig);

// Xuất middleware để Next.js sử dụng
export default middleware;

// Áp dụng middleware cho các route được chỉ định
export const config = {
        matcher: ["/admin/:path*", "/account"],
};
