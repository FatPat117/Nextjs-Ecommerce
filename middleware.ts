// middleware.ts
import { auth } from "@/lib/auth"; // <-- Import từ file auth.ts của bạn

export default auth((req) => {
        const user = req.auth?.user;

        // Nếu người dùng truy cập vào trang admin
        if (req.nextUrl.pathname.startsWith("/admin")) {
                // Nếu họ không đăng nhập hoặc không có vai trò 'admin', chuyển hướng về trang chủ
                if (!user || user.role !== "admin") {
                        const newUrl = new URL("/", req.nextUrl.origin);
                        return Response.redirect(newUrl);
                }
        }
});

// Áp dụng middleware cho các route được chỉ định
export const config = {
        matcher: ["/admin/:path*", "/account"],
};
