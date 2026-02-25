import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const { priceId } = await req.json();

        // Ensure priceId is provided (or map lookup keys here)
        // For this implementation, we allow dynamic priceId or fallback to a default if needed
        // but robustly we should validate it against allowed prices.

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "brl",
                        product_data: {
                            name: "Pacote de Fotos Profissionais",
                            description: "Headshots gerados por IA com qualidade de estúdio",
                        },
                        unit_amount: priceId === "pro" ? 4990 : 2990, // Example mapping: 49.90 or 29.90
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${req.headers.get("origin")}/dashboard?success=true`,
            cancel_url: `${req.headers.get("origin")}/?canceled=true`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
