"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const SortingControl = () => {
        const pathname = usePathname();
        const searchParams = useSearchParams();
        const currentSort = searchParams.get("sort");

        const createSortUrl = (sortValue: string | null) => {
                const params = new URLSearchParams(searchParams);

                if (sortValue) {
                        params.set("sort", sortValue);
                } else {
                        params.delete("sort");
                }

                return `${pathname}?${params.toString()}`;
        };
        return (
                <>
                        <h3 className="text-xs text-muted-foreground mb-2">Sorting</h3>
                        <ul>
                                <li>
                                        {" "}
                                        <Link
                                                href={createSortUrl(null)}
                                                className={`text-sm hover:text-primary ${
                                                        !currentSort ? " underline" : ""
                                                }`}
                                        >
                                                Latest
                                        </Link>
                                </li>
                                <li>
                                        {" "}
                                        <Link
                                                href={createSortUrl("price-asc")}
                                                className={`text-sm hover:text-primary ${
                                                        currentSort == "price-asc" ? " underline" : ""
                                                }`}
                                        >
                                                Price: Low to High
                                        </Link>
                                </li>
                                <li>
                                        {" "}
                                        <Link
                                                href={createSortUrl("price-desc")}
                                                className={`text-sm hover:text-primary ${
                                                        currentSort == "price-desc" ? " underline" : ""
                                                }`}
                                        >
                                                Price: High to Low
                                        </Link>
                                </li>
                        </ul>
                </>
        );
};

export default SortingControl;
