const SearchLayout = ({ children }: { children: React.ReactNode }) => {
        return (
                <main className="container mx-auto py-4">
                        <div className="flex gap-8">
                                <div className="w-[125px] flex-none">
                                        Categories
                                        {/* <Suspense
                                        fallback={
                                                <div className="w-[125px] h-[100px] bg-gray-200 rounded-md">
                                                        Loading...
                                                </div>
                                        }
                                >
                                        {" "}
                                        <CategorySidebar activeCategory={slug} />
                                </Suspense> */}
                                </div>

                                <div className="flex-1">{children}</div>
                                <div className="w-[125px] flex-none">Sorting</div>
                        </div>
                </main>
        );
};

export default SearchLayout;
