import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

/**
 * GET /api/profile/credits?uid=xxx
 * Returns the credit balance for a given user.
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const uid = searchParams.get("uid");

        if (!uid) {
            return NextResponse.json({ error: "uid é obrigatório." }, { status: 400 });
        }

        const docRef = adminDb.collection("users").doc(uid);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            // No profile yet — return 0 credits (profile will be created on first signup)
            return NextResponse.json({ credits: 0 });
        }

        const data = docSnap.data()!;
        return NextResponse.json({ credits: data.credits ?? 0 });
    } catch (error: any) {
        console.error("GET /api/profile/credits error:", error);
        return NextResponse.json(
            { error: error.message || "Falha ao buscar créditos." },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/profile/credits
 * Deducts credits from a user.
 * Body: { uid: string, amount: number }
 */
export async function PATCH(req: NextRequest) {
    try {
        const { uid, amount } = await req.json();

        if (!uid || !amount || amount <= 0) {
            return NextResponse.json({ error: "uid e amount são obrigatórios." }, { status: 400 });
        }

        const { FieldValue } = await import("firebase-admin/firestore");
        const docRef = adminDb.collection("users").doc(uid);
        await docRef.update({
            credits: FieldValue.increment(-amount),
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("PATCH /api/profile/credits error:", error);
        return NextResponse.json(
            { error: error.message || "Falha ao deduzir créditos." },
            { status: 500 }
        );
    }
}
