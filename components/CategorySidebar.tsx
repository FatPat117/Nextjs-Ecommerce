import db from "@/lib/db";
import Link from "next/link";

const CategorySidebar = async ({ activeCategory }: { activeCategory: string }) => {
        const categories = await db.category.findMany({
                select: {
                        name: true,
                        slug: true,
                },
                orderBy: {
                        name: "asc",
                },
        });

        return (
                <div className="w-[125px] flex-none">
                        <h3 className="text-xs text-muted-foreground mb-2">Collections</h3>

                        <ul>
                                {categories.map((category) => (
                                        <li key={category.slug}>
                                                <Link
                                                        href={`/search/${category.slug}`}
                                                        className={`text-sm  hover:text-primary ${
                                                                activeCategory == category.slug ? " underline" : ""
                                                        }`}
                                                >
                                                        {category.name}
                                                </Link>
                                        </li>
                                ))}
                        </ul>
                </div>
        );
};

export default CategorySidebar;
