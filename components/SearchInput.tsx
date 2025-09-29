"use client";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";

const SearchInput = () => {
        const searchParams = useSearchParams();
        const router = useRouter();
        const initialQuery = searchParams.get("query") ?? "";
        const [query, setQuery] = useState(initialQuery);

        useEffect(() => {
                setQuery(initialQuery);
        }, [initialQuery]);

        const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const search = query.trim().toLowerCase();
                const params = new URLSearchParams(searchParams);

                if (search) {
                        params.set("query", search);
                        router.push(`/search?${params.toString()}`);
                } else {
                        params.delete("query");
                        router.push("/search");
                }
        };
        return (
                <form className="relative w-full" onSubmit={handleSearch}>
                        <SearchIcon className="absolute w-4 h-4 text-muted-foreground left-2 top-1/2 -translate-y-1/2" />
                        <Input
                                type="search"
                                placeholder="Search Products..."
                                className="pl-8"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                        />
                </form>
        );
};

export default SearchInput;
