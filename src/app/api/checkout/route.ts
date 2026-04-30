import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const { priceId } = await req.json();

        const amounts: Record<string, number> = {
            starter: 8990,
            pro: 10990,
        };

        const unitAmount = amounts[priceId] ?? 8990;
        const origin = req.headers.get("origin");

        const baseConfig: Stripe.Checkout.SessionCreateParams = {
            payment_method_types: ["card", "pix"],
            line_items: [
                {
                    price_data: {
                        currency: "brl",
                        product_data: {
                            name: `ElevePic - Pacote ${priceId === "starter" ? "Essencial" : "Profissional"}`,
                            description: "Headshots gerados por IA com qualidade de estúdio",
                        },
                        unit_amount: unitAmount,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            metadata: {
                credits: priceId === "pro" ? "12" : "5",
            },
            success_url: `${origin}/signup?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/?canceled=true`,
        };

        let session: Stripe.Checkout.Session;

        try {
            session = await stripe.checkout.sessions.create(baseConfig);
        } catch (error) {
            const isPixInvalid =
                error instanceof Error &&
                error.message.includes("payment method type provided: pix is invalid");

            if (!isPixInvalid) throw error;

            console.warn("PIX não habilitado nesta conta Stripe. Usando apenas cartão.");
            session = await stripe.checkout.sessions.create({
                ...baseConfig,
                payment_method_types: ["card"],
            });
        }

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
