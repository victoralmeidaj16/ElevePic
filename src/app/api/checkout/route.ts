import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

const DEFAULT_PAYMENT_METHOD_TYPES = ["card", "pix"] as const;

export async function POST(req: Request) {
    try {
        const { priceId } = await req.json();

        // Ensure priceId is provided (or map lookup keys here)
        // For this implementation, we allow dynamic priceId or fallback to a default if needed
        // but robustly we should validate it against allowed prices.

        const amounts: Record<string, number> = {
            starter: 8990,
            pro: 10990,
        };

        const unitAmount = amounts[priceId] ?? 8990;

        const sessionConfig: Parameters<typeof stripe.checkout.sessions.create>[0] = {
            payment_method_types: [...DEFAULT_PAYMENT_METHOD_TYPES],
            line_items: [
                {
                    price_data: {
                        currency: "brl",
                        product_data: {
                            name: `ElevePic - Pacote ${priceId === 'starter' ? 'Essencial' : 'Profissional'}`,
                            description: "Headshots gerados por IA com qualidade de estúdio",
                        },
                        unit_amount: unitAmount,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            metadata: {
                credits: priceId === 'pro' ? '12' : '5'
            },
            success_url: `${req.headers.get("origin")}/signup?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get("origin")}/?canceled=true`,
        };

        let session;

        try {
            session = await stripe.checkout.sessions.create(sessionConfig);
        } catch (error) {
            const shouldFallbackToCard =
                error instanceof Error &&
                error.message.includes("payment method type provided: pix is invalid");

            if (!shouldFallbackToCard) {
                throw error;
            }

            console.warn("Pix is not enabled for this Stripe account yet. Falling back to card-only checkout.");

            session = await stripe.checkout.sessions.create({
                ...sessionConfig,
                payment_method_types: ["card"],
            });
        }

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
