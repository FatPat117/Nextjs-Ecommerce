import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug } from "@/lib/action";
import { delay, formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";

const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
        const { slug } = await params;
        console.log(slug);
        const product = await getProductBySlug(slug);
        if (!product) {
                notFound();
        }
        await delay(5000);
        return (
                <div className="container mx-auto p-4">
                        <Card className="max-w-3xl mx-auto">
                                <CardContent className="p-6">
                                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                                        <div className="flex items-center gap-2 mb-4">
                                                <span className="font-semibold text-lg ">
                                                        {formatPrice(product.price)}
                                                </span>
                                                <Badge variant={"outline"}>{product.category?.name}</Badge>
                                        </div>

                                        <Separator className="my-4" />

                                        <div className="space-y-2">
                                                <h2 className="font-medium">Description</h2>
                                                <p>{product.description}</p>
                                        </div>
                                </CardContent>
                        </Card>
                </div>
        );
};

export default ProductPage;
