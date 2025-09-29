import CategorySidebar from "@/components/CategorySidebar";
import SortingControl from "@/components/SortingControl";
import db from "@/lib/db";
import { Suspense } from "react";
async function CategorySidebarServerWrapper() {
        const categories = await db.category.findMany({
                select: {
                        name: true,
                        slug: true,
                },
                orderBy: {
                        name: "asc",
                },
        });
        return <CategorySidebar categories={categories} />;
}

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
        return (
                <main className="container mx-auto py-4">
                        <div className="flex gap-8">
                                <div className="w-[125px] flex-none">
                                        Categories
                                        <Suspense
                                                fallback={
                                                        <div className="w-[125px] h-[100px] bg-gray-200 rounded-md">
                                                                Loading...
                                                        </div>
                                                }
                                        >
                                                <CategorySidebarServerWrapper />
                                        </Suspense>
                                </div>

                                <div className="flex-1">{children}</div>
                                <div className="w-[125px] flex-none">
                                        <SortingControl />
                                </div>
                        </div>
                </main>
        );
};

export default SearchLayout;
