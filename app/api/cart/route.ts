import { getCart } from "@/lib/action";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
        try {
                const cart = await getCart();
                return NextResponse.json({
                        itemCount: cart?.items.length || 0,
                });
        } catch (error) {
                console.log(error);
                return NextResponse.json({ itemCount: 0 }, { status: 500 });
        }
}
