import AddToCartBtn from "@/components/AddToCartBtn";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug } from "@/lib/action";
import db from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";

export const validate = 60 * 60;

export async function generateStaticParams() {
        const products = await db.product.findMany();
        return products.map((product) => ({ slug: product.slug }));
}

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

const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
        const { slug } = await params;
        const product = await getProductBySlug(slug);
        if (!product) {
                notFound();
        }

        const breadcrumbs = [
                {
                        label: "Products",
                        href: "/products",
                },
                {
                        label: product.category?.name,
                        href: `/search/${product.category?.slug}`,
                },
                {
                        label: product.name,
                        href: `/product/${product.slug}`,
                        active: true,
                },
        ];

        const jsonLd = {
                "@context": "https://schema.org",
                "@type": "Product",
                name: product.name,
                description: product.description,
                image: product.image,
                brand: product.category?.name,
                price: product.price,
                offers: {
                        "@type": "Offer",
                        price: product.price,
                        priceCurrency: "USD",
                        availability: product.inventory > 0 ? "InStock" : "OutOfStock",
                        seller: {
                                "@type": "Organization",
                        },
                },
        };
        return (
                <div className="container mx-auto py-4">
                        <Breadcrumbs items={breadcrumbs} />
                        <Card>
                                <CardContent className="p-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                                <div className="relative rounded-lg h-[200px] md:h-[400px]">
                                                        {product?.image && (
                                                                <Image
                                                                        src={product?.image}
                                                                        alt={product.name}
                                                                        fill
                                                                        priority
                                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                                        className="object-cover "
                                                                />
                                                        )}
                                                </div>
                                        </div>
                                        <div>
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

                                                <Separator className="my-4" />

                                                <div className="space-y-2">
                                                        <h2 className="font-medium">Available</h2>
                                                        <div className="flex items-center gap-2">
                                                                {product.inventory > 0 ? (
                                                                        <Badge
                                                                                variant={"outline"}
                                                                                className="text-green-600 font-semibold"
                                                                        >
                                                                                In Stock
                                                                        </Badge>
                                                                ) : (
                                                                        <Badge
                                                                                variant={"outline"}
                                                                                className="text-red-600 font-semibold"
                                                                        >
                                                                                Out of stock
                                                                        </Badge>
                                                                )}

                                                                <span className="text-sm text-gray-500">
                                                                        ({product.inventory} items available)
                                                                </span>
                                                        </div>
                                                </div>

                                                <Separator className="my-4" />
                                                <div>
                                                        <AddToCartBtn product={product} />
                                                </div>
                                        </div>
                                </CardContent>
                        </Card>
                        <script
                                type="application/ld+json"
                                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                        />
                </div>
        );
};

export default ProductPage;
