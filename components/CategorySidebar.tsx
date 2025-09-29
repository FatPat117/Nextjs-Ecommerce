"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

type Category = {
        name: string;
        slug: string;
};

type CategoryProps = {
        categories: Category[];
};

const CategorySidebar = ({ categories }: CategoryProps) => {
        const params = useParams();
        const activeCategory = params.slug;
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
