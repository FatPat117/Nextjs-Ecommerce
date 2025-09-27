import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getProductBySlug } from "@/lib/action";
import { Separator } from "@radix-ui/react-separator";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
        const { slug } = await params;
        const product = await getProductBySlug(slug);
        if (!product) {
                return {};
        }
        return {
                title: product.name,
                description: product.description,
                openGraph: {
                        title: product.name,
                        description: product.description,
                        images: [product.image],
                },
        };
}

const LoadingProductPage = () => {
        return (
                <div className="container mx-auto p-4">
                        <Card className="max-w-3xl mx-auto">
                                <CardContent className="p-6">
                                        <Skeleton className="h-10 w-full" />
                                        <div className="flex items-center gap-2 my-4">
                                                <Skeleton className="h-6 w-24" />
                                                <Skeleton className="h-6 w-32" />
                                        </div>

                                        <Separator className="my-4" />

                                        <div className="space-y-2">
                                                <Skeleton className="h-6 w-32" />
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-4 w-full" />
                                        </div>
                                </CardContent>
                        </Card>
                </div>
        );
};

export default LoadingProductPage;
