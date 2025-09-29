import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";
import { ModeToggle } from "./mode-toggle";
import SearchInput from "./SearchInput";
import { Button } from "./ui/button";
export const categories = [
        { id: 1, name: "Electronics", href: "/category/electronics" },
        { id: 2, name: "Clothing", href: "/category/clothing" },
        { id: 3, name: "Books", href: "/category/books" },
        { id: 4, name: "Toys", href: "/category/toys" },
        { id: 5, name: "Other", href: "/category/other" },
];

const Navbar = () => {
        return (
                <div className="border-b border-dashed ">
                        <div className="container mx-auto flex h-16 items-center justify-between">
                                {/* Flex */}
                                <div>
                                        <div className="flex items-center gap-6">
                                                <Link href="/" className="text-2xl font-bold hidden md:block">
                                                        Store
                                                </Link>
                                                <nav className="hidden md:flex items-center gap-6">
                                                        {categories.map((category) => (
                                                                <Link
                                                                        key={category.id}
                                                                        href={category.href}
                                                                        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
                                                                >
                                                                        {category.name}
                                                                </Link>
                                                        ))}
                                                </nav>

                                                {/* Mobile nav */}
                                                <MobileNavbar />
                                        </div>
                                </div>

                                {/* Search */}
                                <div className="block w-full mx-4 md:mx-8">
                                        <SearchInput />
                                </div>

                                {/* Right */}
                                <div className="flex items-center gap-2">
                                        {/* Search */}
                                        <Button variant={"ghost"} size={"icon"} asChild>
                                                <Link href="/search">
                                                        <Search className="h-5 w-5" />
                                                </Link>
                                        </Button>

                                        {/* Cart */}
                                        <Button variant={"ghost"} size={"icon"} asChild>
                                                <Link href="/cart">
                                                        <ShoppingCart className="h-5 w-5" />
                                                </Link>
                                        </Button>

                                        {/* Theme */}
                                        <ModeToggle />
                                </div>
                        </div>
                </div>
        );
};

export default Navbar;
