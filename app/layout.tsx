import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
        variable: "--font-geist-sans",
        subsets: ["latin"],
});

const geistMono = Geist_Mono({
        variable: "--font-geist-mono",
        subsets: ["latin"],
});

export const metadata: Metadata = {
        title: {
                default: "E-Commerce Store",
                template: "%s | E-Commerce Store",
        },
        description: "A simple e-commerce store built with Next.js, Prisma, and Tailwind CSS",
        openGraph: {
                title: "E-Commerce Store",
                description: "A simple e-commerce store built with Next.js, Prisma, and Tailwind CSS",
                url: process.env.NEXT_PUBLIC_URL,
                siteName: "E-Commerce Store",
        },
};

export default function RootLayout({
        children,
}: Readonly<{
        children: React.ReactNode;
}>) {
        return (
                <Suspense>
                        <html lang="en" className="mdl-js" suppressHydrationWarning>
                                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                                        <SessionProvider>
                                                <ThemeProvider
                                                        attribute="class"
                                                        defaultTheme="system"
                                                        enableSystem
                                                        disableTransitionOnChange
                                                >
                                                        <>
                                                                <header>
                                                                        <Navbar />
                                                                </header>
                                                                {children}

                                                                <footer className="border-t border-dashed py-6">
                                                                        <div className="container mx-auto text-sm text-muted-foreground text-center">
                                                                                &copy; {new Date().getFullYear()} Store.
                                                                                All rights reserved.
                                                                        </div>
                                                                </footer>
                                                        </>
                                                        <Toaster richColors position="top-right" />
                                                </ThemeProvider>
                                        </SessionProvider>
                                </body>
                        </html>
                </Suspense>
        );
}
