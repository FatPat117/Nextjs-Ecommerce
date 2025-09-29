import { Menu } from "lucide-react";
import Link from "next/link";
import { categories } from "./Navbar";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

const MobileNavbar = () => {
        return (
                <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                                <Button variant={"ghost"} size={"icon"}>
                                        <Menu className="w-5 h-5" />
                                </Button>
                        </SheetTrigger>

                        <SheetContent side={"left"}>
                                <SheetHeader>
                                        <SheetTitle>Menu</SheetTitle>
                                </SheetHeader>

                                <nav className="flex flex-col gap-4 p-4">
                                        <SheetClose asChild>
                                                <Link href="/">Home</Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                                <Link href="/products">Products</Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                                <Link href="/cart">Cart</Link>
                                        </SheetClose>

                                        <div>
                                                <h3 className="text-xs font-medium mb-2 text-muted-foreground">
                                                        Categories
                                                </h3>
                                                {categories.map((category) => (
                                                        <SheetClose asChild key={category.id}>
                                                                <Link
                                                                        href={category.href}
                                                                        className="block text-sm font-medium  py-2 "
                                                                >
                                                                        {category.name}
                                                                </Link>
                                                        </SheetClose>
                                                ))}
                                        </div>
                                </nav>
                        </SheetContent>
                </Sheet>
        );
};

export default MobileNavbar;
