import { Product } from "@/app/generated/prisma";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

const ProductCard = ({ product }: { product: Product }) => {
        return (
                <div className="border border-gray-200 rounded-lg p-4">
                        <div className="relative aspect-video">
                                {" "}
                                <Image
                                        src={product.image ?? ""}
                                        alt={product.name}
                                        fill
                                        className=" object-center"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                        </div>

                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className="text-gray-600">{formatPrice(product.price)}</p>
                        <p className="text-gray-600">{product.description}</p>
                </div>
        );
};

export default ProductCard;
