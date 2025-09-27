import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
        return (
                <Card className="pt-0 overflow-hidden">
                        {/* Image skeleton */}
                        <div className="relative aspect-video">
                                <Skeleton className="w-full h-full rounded-none" />
                        </div>

                        <CardHeader>
                                {/* Title skeleton */}
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                {/* Description skeleton */}
                                <Skeleton className="h-4 w-full mb-1" />
                                <Skeleton className="h-4 w-2/3" />
                        </CardHeader>

                        <CardFooter>
                                {/* Price skeleton */}
                                <Skeleton className="h-5 w-20" />
                        </CardFooter>
                </Card>
        );
};

export default ProductCardSkeleton;
