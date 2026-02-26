import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
            return NextResponse.json({ error: "Session ID required" }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        return NextResponse.json({
            email: session.customer_details?.email || "",
            name: session.customer_details?.name || "",
        });
    } catch (error) {
        console.error("Error retrieving session:", error);
        return NextResponse.json({ error: "Failed to retrieve session" }, { status: 500 });
    }
}
