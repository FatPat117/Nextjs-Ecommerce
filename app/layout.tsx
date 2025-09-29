import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
        title: "E-commerce-store",
        description: "A simple e-commerce store built with Next.js, Prisma, and Tailwind CSS",
};

export default function RootLayout({
        children,
}: Readonly<{
        children: React.ReactNode;
}>) {
        return (
                <html lang="en" className="mdl-js" suppressHydrationWarning>
                        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
                                                                &copy; {new Date().getFullYear()} Store. All rights
                                                                reserved.
                                                        </div>
                                                </footer>
                                        </>
                                </ThemeProvider>
                        </body>
                </html>
        );
}
