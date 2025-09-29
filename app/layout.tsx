import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
        variable: "--font-geist-sans",
        subsets: ["latin"],
});

const geistMono = Geist_Mono({
        variable: "--font-geist-mono",
        subsets: ["latin"],
});

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
                                                <ul>
                                                        <li>
                                                                <Link href={"/"}>Home </Link>
                                                        </li>
                                                        <li>
                                                                <Link href={"products"}>Products</Link>
                                                        </li>
                                                        <li>
                                                                <ModeToggle />
                                                        </li>
                                                </ul>
                                                {children}
                                        </>
                                </ThemeProvider>
                        </body>
                </html>
        );
}
